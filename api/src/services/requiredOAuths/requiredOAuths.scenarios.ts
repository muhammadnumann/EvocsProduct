import type { Prisma, RequiredOAuth } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.RequiredOAuthCreateArgs>({
  requiredOAuth: {
    one: {
      data: {
        google: true,
        azureAD: true,
        adFS: true,
        ping: true,
        adLDAP: true,
        zoom: true,
        customerProduct: {
          create: {
            config: { foo: 'bar' },
            updatedAt: '2022-09-18T03:16:25Z',
            product: {
              create: {
                title: 'String',
                description: 'String',
                config: { foo: 'bar' },
                updatedAt: '2022-09-18T03:16:25Z',
              },
            },
            customer: {
              create: {
                name: 'String7431523',
                status: 'PENDING',
                vaultKey: 'String',
                updatedAt: '2022-09-18T03:16:25Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        google: true,
        azureAD: true,
        adFS: true,
        ping: true,
        adLDAP: true,
        zoom: true,
        customerProduct: {
          create: {
            config: { foo: 'bar' },
            updatedAt: '2022-09-18T03:16:25Z',
            product: {
              create: {
                title: 'String',
                description: 'String',
                config: { foo: 'bar' },
                updatedAt: '2022-09-18T03:16:25Z',
              },
            },
            customer: {
              create: {
                name: 'String1934390',
                status: 'PENDING',
                vaultKey: 'String',
                updatedAt: '2022-09-18T03:16:25Z',
              },
            },
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<RequiredOAuth, 'requiredOAuth'>;
