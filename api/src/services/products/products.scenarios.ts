import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.ProductCreateArgs>({
  product: {
    one: {
      data: {
        title: 'String',
        description: 'String',
        config: 123,
        updatedAt: '2022-07-30T22:29:43Z',
      },
    },
    two: {
      data: {
        title: 'String',
        description: 'String',
        config: 456,
        updatedAt: '2022-07-30T22:29:43Z',
      },
    },
  },
});

export type StandardScenario = typeof standard;
