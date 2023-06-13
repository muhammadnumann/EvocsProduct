import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.CustomerTenantCreateArgs>({
  customerTenant: {
    one: {
      data: {
        url: 'String',
        customer: {
          create: {
            name: 'String8704167',
            status: 'PENDING',
            vaultKey: 'String',
            updatedAt: '2022-08-17T15:53:45Z',
          },
        },
      },
    },
    two: {
      data: {
        url: 'String',
        customer: {
          create: {
            name: 'String9921535',
            status: 'PENDING',
            vaultKey: 'String',
            updatedAt: '2022-08-17T15:53:45Z',
          },
        },
      },
    },
  },
});

export type StandardScenario = typeof standard;
