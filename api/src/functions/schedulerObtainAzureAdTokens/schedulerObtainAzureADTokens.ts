import { AuthorizationUrlRequest, ResponseMode } from '@azure/msal-node';
import type { APIGatewayEvent, Context } from 'aws-lambda';

import { authDecoder } from '@redwoodjs/auth-auth0-api';
import { useRequireAuth } from '@redwoodjs/graphql-server';

import { getCurrentUser, isAuthenticated } from 'src/lib/auth';
import { logger } from 'src/lib/logger';
import { InterviewSchedulerScopes, schedulerMSALInstance } from 'src/lib/msal';

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
const handlerFn = async (_event: APIGatewayEvent, _context: Context) => {
  logger.info('Invoked schedulerObtainAzureADTokens function');
  if (!isAuthenticated()) {
    logger.error('unauthenticated schedulerObtainAzureADTokens invocation');
    return {
      statusCode: 401,
    };
  }

  const msalInstance = schedulerMSALInstance();
  const params: AuthorizationUrlRequest = {
    scopes: [...InterviewSchedulerScopes],
    redirectUri: process.env.AUTH0_REDIRECT_URI,
    responseMode: ResponseMode.QUERY,
    prompt: 'consent',
  };

  const authCodeURL = await msalInstance.getAuthCodeUrl(params);

  return {
    statusCode: 302,
    headers: {
      Location: authCodeURL,
    },
  };
};

const useRequireQueryParamAuth = async (
  event: APIGatewayEvent,
  context: Context
) => {
  const { token } = event.queryStringParameters;
  console.log(token);
  event.headers['auth-provider'] = 'auth0';
  event.headers.authorization = `Bearer ${token}`;

  const authHandler = useRequireAuth({
    handlerFn,
    getCurrentUser,
    authDecoder,
  });

  return await authHandler(event, context);
};

export const handler = useRequireQueryParamAuth;
// export const handler = handlerFn;
