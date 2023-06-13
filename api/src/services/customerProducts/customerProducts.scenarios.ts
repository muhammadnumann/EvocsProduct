import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.CustomerProductCreateArgs>({
  customerProduct: {
    one: {
      data: {
        config: { foo: 'bar' },
        updatedAt: '2022-08-17T15:54:37Z',
        product: {
          create: {
            title: 'String',
            description: 'String',
            config: `{ foo: 'bar' }`,
            updatedAt: '2022-08-17T15:54:37Z',
          },
        },
        customer: {
          create: {
            name: 'String2355713',
            status: 'PENDING',
            vaultKey: 'String',
            updatedAt: '2022-08-17T15:54:37Z',
          },
        },
      },
    },
    two: {
      data: {
        config: `{ foo: 'bar' }`,
        updatedAt: '2022-08-17T15:54:37Z',
        product: {
          create: {
            title: 'String',
            description: 'String',
            config: `{ foo: 'bar' }`,
            updatedAt: '2022-08-17T15:54:37Z',
          },
        },
        customer: {
          create: {
            name: 'String1662523',
            status: 'PENDING',
            vaultKey: 'String',
            updatedAt: '2022-08-17T15:54:37Z',
          },
        },
      },
    },
  },
});

export type StandardScenario = typeof standard;
