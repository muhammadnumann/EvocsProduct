import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.CustomerCreateArgs>({
  customer: {
    one: {
      data: {
        name: 'String5112153',
        status: 'PENDING',
        updatedAt: '2022-08-04T21:58:56Z',
        vaultKey: 'abc',
      },
    },
    two: {
      data: {
        name: 'String8388551',
        status: 'PENDING',
        updatedAt: '2022-08-04T21:58:56Z',
        vaultKey: 'abc',
      },
    },
  },
});

export type StandardScenario = typeof standard;
