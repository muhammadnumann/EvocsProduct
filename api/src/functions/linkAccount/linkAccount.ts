import { fetch } from '@whatwg-node/fetch';
import type { APIGatewayEvent, Context } from 'aws-lambda';

import { authDecoder } from '@redwoodjs/auth-auth0-api';
import { useRequireAuth } from '@redwoodjs/graphql-server';

import {
  getCurrentUser,
  getCurrentUserID,
  isAuthenticated,
} from 'src/lib/auth';
import { db } from 'src/lib/db';
import { logger } from 'src/lib/logger';

type RequestBody = {
  targetUserToken: string;
  email: string;
  accessToken: string;
};

const ipAddress = ({ event }: { event: APIGatewayEvent }) =>
  event.headers?.['client-ip'] ||
  event.requestContext?.identity?.sourceIp ||
  'localhost';

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
const linkAccountHandler = async (
  event: APIGatewayEvent,
  _context: Context
) => {
  logger.info('Invoked linkAccount function');
  if (!isAuthenticated()) {
    logger.error(
      { sourceIP: ipAddress({ event }) },
      'unauthorized request sent to linkAccountHandler'
    );
    return { statusCode: 401 };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 404 };
  }

  const body: RequestBody = JSON.parse(event.body);
  const { targetUserToken, email } = body;
  if (!targetUserToken || !email) {
    return { statusCode: 400 };
  }

  const userID = getCurrentUserID();
  const { auth0ID } = await db.user.findUnique({ where: { id: userID } });
  const accessToken = event.headers.authorization.split('Bearer ')[1];

  const auth0LinkResp = await fetch(
    `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${auth0ID}/identities`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        link_with: targetUserToken,
      }),
    }
  );
  const respBody = await auth0LinkResp.json();
  logger.debug(
    { code: auth0LinkResp.status, body: respBody },
    'auth0 link account call complete'
  );

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: 'linkAccount function',
    }),
  };
};

// https://redwoodjs.com/docs/serverless-functions#security-considerations%7CServerless
export const handler = useRequireAuth({
  handlerFn: linkAccountHandler,
  getCurrentUser,
  authDecoder,
});
