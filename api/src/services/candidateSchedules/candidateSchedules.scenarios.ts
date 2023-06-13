import type { Prisma, CandidateSchedule } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.CandidateScheduleCreateArgs>({
  candidateSchedule: {
    one: {
      data: {
        updatedAt: '2023-02-11T17:50:52.584Z',
        Candidate: {
          create: {
            firstName: 'String',
            lastName: 'String',
            email: 'String',
            wdCandidateID: 'String',
            updatedAt: '2023-02-11T17:50:52.584Z',
            customer: {
              create: {
                name: 'String6354639',
                vaultKey: 'String',
                updatedAt: '2023-02-11T17:50:52.584Z',
                status: 'PENDING',
              },
            },
            user: {
              create: {
                auth0ID: 'String577329',
                email: 'String8398158',
                updatedAt: '2023-02-11T17:50:52.584Z',
                status: 'PENDING',
                customer: {
                  create: {
                    name: 'String6640324',
                    vaultKey: 'String',
                    updatedAt: '2023-02-11T17:50:52.584Z',
                    status: 'PENDING',
                  },
                },
              },
            },
          },
        },
        Requsition: {
          create: {
            owningCustomerID: 2423864,
            owningUserID: 864984,
            title: 'String',
            requisitionID: 8272921,
            status: 'String',
            updatedAt: '2023-02-11T17:50:52.584Z',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2023-02-11T17:50:52.584Z',
        Candidate: {
          create: {
            firstName: 'String',
            lastName: 'String',
            email: 'String',
            wdCandidateID: 'String',
            updatedAt: '2023-02-11T17:50:52.584Z',
            customer: {
              create: {
                name: 'String5297838',
                vaultKey: 'String',
                updatedAt: '2023-02-11T17:50:52.584Z',
                status: 'PENDING',
              },
            },
            user: {
              create: {
                auth0ID: 'String3629260',
                email: 'String2719130',
                updatedAt: '2023-02-11T17:50:52.584Z',
                status: 'PENDING',
                customer: {
                  create: {
                    name: 'String4967131',
                    vaultKey: 'String',
                    updatedAt: '2023-02-11T17:50:52.584Z',
                    status: 'PENDING',
                  },
                },
              },
            },
          },
        },
        Requsition: {
          create: {
            owningCustomerID: 5366834,
            owningUserID: 776962,
            title: 'String',
            requisitionID: 4621025,
            status: 'String',
            updatedAt: '2023-02-11T17:50:52.584Z',
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<
  CandidateSchedule,
  'candidateSchedule'
>;
