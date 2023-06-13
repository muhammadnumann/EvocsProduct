import type { Prisma } from '@prisma/client';

export const standard =
  defineScenario<Prisma.CustomerProductEnabledTenantCreateArgs>({
    customerProductEnabledTenant: {
      one: {
        data: {
          customerProduct: {
            create: {
              config: { foo: 'bar' },
              updatedAt: '2022-08-17T15:43:49Z',
              product: {
                create: {
                  title: 'String',
                  description: 'String',
                  config: { foo: 'bar' },
                  updatedAt: '2022-08-17T15:43:49Z',
                },
              },
              customer: {
                create: {
                  name: 'String4427218',
                  status: 'PENDING',
                  vaultKey: 'String',
                  updatedAt: '2022-08-17T15:43:49Z',
                },
              },
            },
          },
          customerTenant: {
            create: {
              url: 'String',
              customer: {
                create: {
                  name: 'String7723850',
                  status: 'PENDING',
                  vaultKey: 'String',
                  updatedAt: '2022-08-17T15:43:49Z',
                },
              },
            },
          },
        },
      },
      two: {
        data: {
          customerProduct: {
            create: {
              config: { foo: 'bar' },
              updatedAt: '2022-08-17T15:43:49Z',
              product: {
                create: {
                  title: 'String',
                  description: 'String',
                  config: { foo: 'bar' },
                  updatedAt: '2022-08-17T15:43:49Z',
                },
              },
              customer: {
                create: {
                  name: 'String4403058',
                  status: 'PENDING',
                  vaultKey: 'String',
                  updatedAt: '2022-08-17T15:43:49Z',
                },
              },
            },
          },
          customerTenant: {
            create: {
              url: 'String',
              customer: {
                create: {
                  name: 'String4846793',
                  status: 'PENDING',
                  vaultKey: 'String',
                  updatedAt: '2022-08-17T15:43:49Z',
                },
              },
            },
          },
        },
      },
    },
  });

export type StandardScenario = typeof standard;
