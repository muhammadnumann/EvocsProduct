import {
  OneOfInputObjectsRule,
  useExtendedValidation,
} from '@envelop/extended-validation';

import { authDecoder } from '@redwoodjs/auth-auth0-api';
import { createGraphQLHandler } from '@redwoodjs/graphql-server';

import directives from 'src/directives/**/*.{js,ts}';
import sdls from 'src/graphql/**/*.sdl.{js,ts}';
import services from 'src/services/**/*.{js,ts}';

import { getCurrentUser } from 'src/lib/auth';
import { db } from 'src/lib/db';
import { logger } from 'src/lib/logger';

export const handler = createGraphQLHandler({
  getCurrentUser,
  authDecoder,
  loggerConfig: { logger, options: { data: true, query: true } },
  directives,
  sdls,
  services,
  armorConfig: { maxDepth: { n: 6 } },
  extraPlugins: [
    useExtendedValidation({
      rules: [OneOfInputObjectsRule],
    }),
  ],
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect();
  },
});
