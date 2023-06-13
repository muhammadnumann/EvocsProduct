import type { Prisma, Candidate } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.CandidateCreateArgs>({
  candidate: {
    one: {
      data: {
        firstName: 'String',
        lastName: 'String',
        email: 'String',
        wdCandidateID: 'String',
        updatedAt: '2023-02-11T17:50:16.465Z',
        customer: {
          create: {
            name: 'String277627',
            vaultKey: 'String',
            updatedAt: '2023-02-11T17:50:16.465Z',
            status: 'PENDING',
          },
        },
        user: {
          create: {
            auth0ID: 'String9450514',
            email: 'String2040314',
            updatedAt: '2023-02-11T17:50:16.465Z',
            status: 'PENDING',
            customer: {
              create: {
                name: 'String6296757',
                vaultKey: 'String',
                updatedAt: '2023-02-11T17:50:16.465Z',
                status: 'PENDING',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        firstName: 'String',
        lastName: 'String',
        email: 'String',
        wdCandidateID: 'String',
        updatedAt: '2023-02-11T17:50:16.465Z',
        customer: {
          create: {
            name: 'String817853',
            vaultKey: 'String',
            updatedAt: '2023-02-11T17:50:16.465Z',
            status: 'PENDING',
          },
        },
        user: {
          create: {
            auth0ID: 'String7610793',
            email: 'String4306313',
            updatedAt: '2023-02-11T17:50:16.465Z',
            status: 'PENDING',
            customer: {
              create: {
                name: 'String2166710',
                vaultKey: 'String',
                updatedAt: '2023-02-11T17:50:16.465Z',
                status: 'PENDING',
              },
            },
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Candidate, 'candidate'>;
