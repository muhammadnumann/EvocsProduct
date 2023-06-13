import type { APIGatewayEvent, Context } from 'aws-lambda';
import { CreateUserInput } from 'types/graphql';

import {
  verifyEvent,
  VerifyOptions,
  WebhookVerificationError,
} from '@redwoodjs/api/dist/webhooks';

import { db } from 'src/lib/db';
import { logger } from 'src/lib/logger';

type WebhookBody = {
  auth0UserID: string;
  auth0OrganizationID: string;
  email: string;
  name: string;
};

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
export const handler = async (event: APIGatewayEvent, _context: Context) => {
  const auth0PostRegInfo = { webhook: 'auth0PostUserReg' };
  const webhookLogger = logger.child({ auth0PostRegInfo });

  webhookLogger.info('Invoked auth0PostUserRegistrationWebhook function');
  webhookLogger.trace('>> in auth0PostUserRegistrationWebhook');
  try {
    const options: VerifyOptions = {
      signatureHeader: 'RW-Webhook-Signature',
    };
    verifyEvent('timestampSchemeVerifier', {
      event,
      secret: process.env.AUTH0_WEBHOOK_SECRET,
      options,
    });
    webhookLogger.info({}, 'event verified');

    webhookLogger.debug({ headers: event.headers }, 'Headers');

    const body: WebhookBody = JSON.parse(event.body);
    webhookLogger.debug({ body }, 'Body');

    const { auth0UserID, auth0OrganizationID, email, name: _name } = body;
    const { id: customerID } = await db.customer.findUnique({
      where: { auth0ID: auth0OrganizationID },
    });

    const user: CreateUserInput = {
      auth0ID: auth0UserID,
      customerID,
      email,
      status: 'PENDING',
    };
    await db.user.create({ data: user });

    return {
      statusCode: 201,
    };
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      webhookLogger.warn('Unauthorized');

      return {
        statusCode: 401,
      };
    } else {
      webhookLogger.error({ error }, error.message);

      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }
};
