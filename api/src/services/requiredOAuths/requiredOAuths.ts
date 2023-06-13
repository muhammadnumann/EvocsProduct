import Prisma from '@prisma/client';
import type {
  QueryResolvers,
  MutationResolvers,
  RequiredOAuthRelationResolvers,
} from 'types/graphql';

import { ForbiddenError } from '@redwoodjs/graphql-server';

import {
  getCurrentUserID,
  hasRole,
  isEvocsUser,
  requireAuth,
  RoleList,
} from 'src/lib/auth';
import { db } from 'src/lib/db';
import { logger } from 'src/lib/logger';

import { userInCustomer } from '../customers/customers';

export const userCanConfigureProductAuth: QueryResolvers['userCanConfigureProductAuth'] =
  async ({ args: { productID, userID } }) => {
    const requestingUserID = getCurrentUserID();
    if (
      userID !== requestingUserID &&
      !hasRole([RoleList.EvocsInternal, RoleList.Admin])
    ) {
      logger.error(
        {
          requestingUserID,
          userID,
          endpoint: 'userCanConfigureProductAuth',
        },
        'user tried to check product auth status for a different user'
      );
      throw new ForbiddenError("You don't have access to do that.");
    }

    const { customerID } = await db.user.findUnique({
      where: { id: userID },
      select: { customerID: true },
    });

    const productExists = await db.customerProduct.findUnique({
      where: {
        customerID_productID: {
          customerID,
          productID,
        },
      },
      select: {
        _count: true,
      },
    });

    return !!productExists;
  };

export const requiredOAuthForProduct: QueryResolvers['requiredOAuthForProduct'] =
  async ({ args: { productID, userID } }) => {
    requireAuth({});
    const requestingUserID = getCurrentUserID();
    const { customerID } = await db.user.findUnique({
      where: { id: userID },
      select: { customerID: true },
    });
    if (
      requestingUserID !== userID &&
      !userInCustomer({ userID, customerID }) &&
      !isEvocsUser()
    ) {
      logger.error(
        {
          requestingUserID,
          userID,
          endpoint: 'requiredOAuthForProduct',
        },
        'user tried to check product auth status for a different user'
      );
      throw new ForbiddenError("You don't have access to do that.");
    }

    return await db.customerProduct
      .findUnique({
        where: {
          customerID_productID: {
            customerID,
            productID,
          },
        },
        select: {
          requiredOAuth: true,
        },
      })
      .then(({ requiredOAuth }) => requiredOAuth);
  };

export const requiredOAuthByProductTitle: QueryResolvers['requiredOAuthByProductTitle'] =
  async ({ title }) => {
    requireAuth({});
    const { customerID } = await db.user.findUnique({
      where: {
        id: getCurrentUserID(),
      },
      select: { customerID: true },
    });

    const { id: productID } = await db.product.findUnique({
      where: {
        title,
      },
    });

    return await db.customerProduct
      .findUnique({
        where: {
          customerID_productID: {
            customerID,
            productID,
          },
        },
        select: {
          requiredOAuth: true,
        },
      })
      .then(({ requiredOAuth }) => requiredOAuth);
  };

export const configuredOAuthByProductTitle: QueryResolvers['configuredOAuthByProductTitle'] =
  async ({ title }) => {
    requireAuth({});

    const userID = getCurrentUserID();

    const { customerID } = await db.user.findUnique({
      where: {
        id: userID,
      },
      select: { customerID: true },
    });

    const { id: productID } = await db.product.findUnique({
      where: {
        title,
      },
    });

    const { id: customerProductID, requiredOAuth } =
      await db.customerProduct.findUnique({
        where: {
          customerID_productID: {
            customerID,
            productID,
          },
        },
        select: {
          id: true,
          requiredOAuth: true,
        },
      });

    const configured: Prisma.RequiredOAuth = {
      ...requiredOAuth,
      adFS: false,
      adLDAP: false,
      azureAD: false,
      google: false,
      ping: false,
      zoom: false,
    };

    const configuredRows = await db.configuredOAuth.findMany({
      where: {
        customerProductID,
      },
    });

    for (const row of configuredRows) {
      switch (row.provider) {
        case 'GOOGLE_WORKSPACE':
          configured.google = true;
          break;
        case 'AZURE_AD':
          configured.azureAD = true;
          break;
        case 'ZOOM':
          configured.zoom = true;
          break;
      }
    }

    return configured;

    // const promises = {
    //   adFS: (async () => false)(),
    //   adLDAP: (async () => false)(),
    //   azureAD: (async () => false)(),
    //   google: (async () => false)(),
    //   ping: (async () => false)(),
    //   zoom: (async () => false)(),
    // };

    // if (requiredOAuth.google) {
    //   promises.google = userHasGoogleAuth({
    //     args: { productID, userID },
    //   }) as Promise<boolean>;
    // }
    // const [adFS, adLDAP, azureAD, google, ping, zoom] = await Promise.all([
    //   promises.adFS,
    //   promises.adLDAP,
    //   promises.azureAD,
    //   promises.google,
    //   promises.ping,
    //   promises.zoom,
    // ]);

    // return { ...configured, adFS, adLDAP, azureAD, google, ping, zoom };
  };

export const requiredOAuths: QueryResolvers['requiredOAuths'] = () => {
  requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
  return db.requiredOAuth.findMany();
};

export const requiredOAuth: QueryResolvers['requiredOAuth'] = ({ id }) => {
  requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
  return db.requiredOAuth.findUnique({
    where: { id },
  });
};

export const createRequiredOAuth: MutationResolvers['createRequiredOAuth'] = ({
  input,
}) => {
  requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
  return db.requiredOAuth.create({
    data: input,
  });
};

export const updateRequiredOAuth: MutationResolvers['updateRequiredOAuth'] = ({
  id,
  input,
}) => {
  requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
  return db.requiredOAuth.update({
    data: input,
    where: { id },
  });
};

export const deleteRequiredOAuth: MutationResolvers['deleteRequiredOAuth'] = ({
  id,
}) => {
  requireAuth({ roles: [RoleList.EvocsInternal, RoleList.Admin] });
  return db.requiredOAuth.delete({
    where: { id },
  });
};

export const RequiredOAuth: RequiredOAuthRelationResolvers = {
  customerProduct: (_obj, { root }) => {
    return db.requiredOAuth
      .findUnique({ where: { id: root?.id } })
      .customerProduct();
  },
};
