import type { Prisma, Note } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.NoteCreateArgs>({
  note: {
    one: {
      data: {
        content: 'String',
        upatedAt: '2023-03-31T00:30:55.560Z',
        User: {
          create: {
            auth0ID: 'String4094424',
            email: 'String108665',
            updatedAt: '2023-03-31T00:30:55.560Z',
            status: 'PENDING',
            customer: {
              create: {
                name: 'String5543062',
                vaultKey: 'String',
                updatedAt: '2023-03-31T00:30:55.560Z',
                status: 'PENDING',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        content: 'String',
        upatedAt: '2023-03-31T00:30:55.560Z',
        User: {
          create: {
            auth0ID: 'String7405238',
            email: 'String2926247',
            updatedAt: '2023-03-31T00:30:55.560Z',
            status: 'PENDING',
            customer: {
              create: {
                name: 'String4967477',
                vaultKey: 'String',
                updatedAt: '2023-03-31T00:30:55.560Z',
                status: 'PENDING',
              },
            },
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Note, 'note'>;
