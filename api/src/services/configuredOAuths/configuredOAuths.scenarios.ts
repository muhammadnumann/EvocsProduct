import type { Prisma, ConfiguredOAuth } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.ConfiguredOAuthCreateArgs>({
  configuredOAuth: {
    one: {
      data: {
        accessToken: 'String',
        refreshToken: 'String',
        expiryDate: '2023-01-24T16:40:02.790Z',
        provider: 'GOOGLE_WORKSPACE',
        updatedAt: '2023-01-24T16:40:02.790Z',
        user: {
          create: {
            auth0ID: 'String6957443',
            email: 'String6479536',
            updatedAt: '2023-01-24T16:40:02.790Z',
            status: 'PENDING',
            customer: {
              create: {
                name: 'String9581338',
                vaultKey: 'String',
                updatedAt: '2023-01-24T16:40:02.790Z',
                status: 'PENDING',
              },
            },
          },
        },
        customerProduct: {
          create: {
            config: { foo: 'bar' },
            updatedAt: '2023-01-24T16:40:02.790Z',
            product: {
              create: {
                title: 'String7792476',
                description: 'String',
                config: { foo: 'bar' },
                updatedAt: '2023-01-24T16:40:02.790Z',
              },
            },
            customer: {
              create: {
                name: 'String4764875',
                vaultKey: 'String',
                updatedAt: '2023-01-24T16:40:02.790Z',
                status: 'PENDING',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        accessToken: 'String',
        refreshToken: 'String',
        expiryDate: '2023-01-24T16:40:02.790Z',
        provider: 'GOOGLE_WORKSPACE',
        updatedAt: '2023-01-24T16:40:02.790Z',
        user: {
          create: {
            auth0ID: 'String2227414',
            email: 'String377559',
            updatedAt: '2023-01-24T16:40:02.790Z',
            status: 'PENDING',
            customer: {
              create: {
                name: 'String2014619',
                vaultKey: 'String',
                updatedAt: '2023-01-24T16:40:02.790Z',
                status: 'PENDING',
              },
            },
          },
        },
        customerProduct: {
          create: {
            config: { foo: 'bar' },
            updatedAt: '2023-01-24T16:40:02.790Z',
            product: {
              create: {
                title: 'String9755476',
                description: 'String',
                config: { foo: 'bar' },
                updatedAt: '2023-01-24T16:40:02.790Z',
              },
            },
            customer: {
              create: {
                name: 'String1145570',
                vaultKey: 'String',
                updatedAt: '2023-01-24T16:40:02.790Z',
                status: 'PENDING',
              },
            },
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<ConfiguredOAuth, 'configuredOAuth'>;
