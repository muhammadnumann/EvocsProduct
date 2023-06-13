import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        auth0ID: 'String3770283',
        email: 'String8776013',
        status: 'PENDING',
        updatedAt: '2022-08-17T16:14:01Z',
        customer: {
          create: {
            name: 'String4669536',
            status: 'PENDING',
            vaultKey: 'String',
            updatedAt: '2022-08-17T16:14:01Z',
          },
        },
      },
    },
    two: {
      data: {
        auth0ID: 'String666878',
        email: 'String7415641',
        status: 'PENDING',
        updatedAt: '2022-08-17T16:14:01Z',
        customer: {
          create: {
            name: 'String6002053',
            status: 'PENDING',
            vaultKey: 'String',
            updatedAt: '2022-08-17T16:14:01Z',
          },
        },
      },
    },
  },
});

export type StandardScenario = typeof standard;
