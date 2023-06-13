import { AuthorizationCodeRequest } from '@azure/msal-node';
import { OAuth2Client as GoogleOAuth2Client } from 'google-auth-library';
import type {
  QueryResolvers,
  MutationResolvers,
  ConfiguredOAuthRelationResolvers,
} from 'types/graphql';

import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server';

import {
  getCurrentUserID,
  hasRole,
  isEvocsUser,
  requireAuth,
  RoleList,
} from 'src/lib/auth';
import { db } from 'src/lib/db';
import { logger } from 'src/lib/logger';
import {
  extractMSALRefreshToken,
  InterviewSchedulerScopes,
  schedulerMSALInstance,
} from 'src/lib/msal';

export const configuredOAuths: QueryResolvers['configuredOAuths'] = () => {
  requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
  return db.configuredOAuth.findMany();
};

export const configuredOAuth: QueryResolvers['configuredOAuth'] = ({ id }) => {
  requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
  return db.configuredOAuth.findUnique({
    where: { id },
  });
};

export const userHasGoogleAuth: QueryResolvers['userHasGoogleAuth'] = async ({
  args: { userID, productID },
}) => {
  requireAuth({});
  if (!isEvocsUser() && userID !== getCurrentUserID()) {
    throw new AuthenticationError("You don't have permission to do that.");
  }

  const { customerID } = await db.user.findUnique({ where: { id: userID } });
  const { id: customerProductID } = await db.customerProduct.findUnique({
    where: { customerID_productID: { customerID, productID } },
  });

  return !!(await db.configuredOAuth.findUnique({
    where: {
      userID_customerProductID_provider: {
        userID,
        customerProductID,
        provider: 'GOOGLE_WORKSPACE',
      },
    },
  }));
};

export const hasGoogleAuth: QueryResolvers['hasGoogleAuth'] = async ({
  productName,
}) => {
  const userID = getCurrentUserID();

  const { customerID } = await db.user.findUnique({
    where: {
      id: userID,
    },
  });
  const { id: customerProductID } = await db.customerProduct.findFirst({
    where: {
      customerID,
      product: {
        title: productName,
      },
    },
  });

  return !!(await db.configuredOAuth.findUnique({
    where: {
      userID_customerProductID_provider: {
        userID,
        customerProductID,
        provider: 'GOOGLE_WORKSPACE',
      },
    },
  }));
};

export const createConfiguredOAuth: MutationResolvers['createConfiguredOAuth'] =
  async ({ input }) => {
    const { userID, provider } = input;

    requireAuth({});
    if (!hasRole([RoleList.Admin])) {
      if (userID !== getCurrentUserID()) {
        throw new ForbiddenError("You don't have access to do that.");
      }
    }

    switch (provider) {
      case 'GOOGLE_WORKSPACE':
        return createGoogleOAuth({ input });
      case 'AZURE_AD':
        return createAzureADOAuth({ input });
    }
  };

export const updateConfiguredOAuth: MutationResolvers['updateConfiguredOAuth'] =
  ({ id, input }) => {
    return db.configuredOAuth.update({
      data: input,
      where: { id },
    });
  };

export const deleteConfiguredOAuth: MutationResolvers['deleteConfiguredOAuth'] =
  ({ id }) => {
    return db.configuredOAuth.delete({
      where: { id },
    });
  };

export const ConfiguredOAuth: ConfiguredOAuthRelationResolvers = {
  user: (_obj, { root }) => {
    requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
    return db.configuredOAuth.findUnique({ where: { id: root?.id } }).user();
  },
  customerProduct: (_obj, { root }) => {
    requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
    return db.configuredOAuth
      .findUnique({ where: { id: root?.id } })
      .customerProduct();
  },
};

const createAzureADOAuth: MutationResolvers['createConfiguredOAuth'] = async ({
  input: { userID, productID, oneTimeAuthToken },
}) => {
  const { customerID } = await db.user.findUnique({
    where: { id: userID },
    select: { customerID: true },
  });

  const cp = await db.customerProduct.findUnique({
    where: {
      customerID_productID: {
        customerID,
        productID,
      },
    },
  });
  if (!cp) {
    throw new AuthenticationError("You don't have permission to do that.");
  }
  const { id: customerProductID } = cp;

  const msalInstance = schedulerMSALInstance();
  const params: AuthorizationCodeRequest = {
    code: oneTimeAuthToken,
    scopes: [...InterviewSchedulerScopes],
    redirectUri: process.env.AUTH0_REDIRECT_URI,
  };
  const { accessToken, expiresOn: expiryDate } =
    await msalInstance.acquireTokenByCode(params);
  const refreshToken = extractMSALRefreshToken(msalInstance);

  return db.configuredOAuth.upsert({
    where: {
      userID_customerProductID_provider: {
        userID,
        customerProductID,
        provider: 'AZURE_AD',
      },
    },
    create: {
      userID,
      customerProductID,
      accessToken,
      refreshToken,
      expiryDate,
      provider: 'AZURE_AD',
    },
    update: {
      accessToken,
      refreshToken,
      expiryDate,
    },
  });
};

const createGoogleOAuth: MutationResolvers['createConfiguredOAuth'] = async ({
  input: { userID, productID, oneTimeAuthToken },
}) => {
  const { customerID } = await db.user.findUnique({
    where: { id: userID },
    select: { customerID: true },
  });

  const cp = await db.customerProduct.findUnique({
    where: {
      customerID_productID: {
        customerID,
        productID,
      },
    },
  });
  if (!cp) {
    throw new AuthenticationError("You don't have permission to do that.");
  }
  const { id: customerProductID } = cp;

  const client = new GoogleOAuth2Client(
    process.env.GOOGLE_SCHEDULER_CLIENT_ID,
    process.env.GOOGLE_SCHEDULER_CLIENT_SECRET,
    process.env.AUTH0_REDIRECT_URI
  );
  const { tokens } = await client.getToken(oneTimeAuthToken);
  logger.debug({ custom: tokens }, 'tokens successfully retrieved');
  const verify = async () => {
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_SCHEDULER_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    logger.debug(
      { custom: { payload, userID, productID } },
      'google auth payload successfully verified'
    );
  };
  try {
    verify();
  } catch (e) {
    logger.error(
      { custom: { error: e, userID, productID } },
      'error verifying id token'
    );
    throw new AuthenticationError("You don't have permission to do that.");
  }
  const {
    refresh_token: refreshToken,
    access_token: accessToken,
    expiry_date,
  } = tokens;
  const expiryDate = new Date(expiry_date);

  return db.configuredOAuth.upsert({
    where: {
      userID_customerProductID_provider: {
        userID,
        customerProductID,
        provider: 'GOOGLE_WORKSPACE',
      },
    },
    update: {
      accessToken,
      refreshToken,
      expiryDate,
    },
    create: {
      userID,
      customerProductID,
      accessToken,
      refreshToken,
      expiryDate,
      provider: 'GOOGLE_WORKSPACE',
    },
  });
};
