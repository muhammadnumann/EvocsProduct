import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.JobCreateArgs>({
  job: {
    one: {
      data: {
        status: 'PENDING',
        updatedAt: '2022-08-15T21:44:44Z',
        user: {
          create: {
            auth0ID: 'String2987916',
            email: 'String8456089',
            status: 'PENDING',
            updatedAt: '2022-08-15T21:44:44Z',
            customer: {
              create: {
                name: 'String669969',
                status: 'PENDING',
                vaultKey: 'abc',
                updatedAt: '2022-08-15T21:44:44Z',
              },
            },
          },
        },
        product: {
          create: {
            title: 'String',
            description: 'String',
            config: 123,
            updatedAt: '2022-08-15T21:44:44Z',
          },
        },
      },
    },
    two: {
      data: {
        status: 'PENDING',
        updatedAt: '2022-08-15T21:44:44Z',
        user: {
          create: {
            auth0ID: 'String7758806',
            email: 'String9345475',
            status: 'PENDING',
            updatedAt: '2022-08-15T21:44:44Z',
            customer: {
              create: {
                name: 'String9784161',
                status: 'PENDING',
                vaultKey: 'def',
                updatedAt: '2022-08-15T21:44:44Z',
              },
            },
          },
        },
        product: {
          create: {
            title: 'String',
            description: 'String',
            config: 456,
            updatedAt: '2022-08-15T21:44:44Z',
          },
        },
      },
    },
  },
});

export type StandardScenario = typeof standard;
