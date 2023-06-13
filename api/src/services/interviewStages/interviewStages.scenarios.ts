import type { Prisma, InterviewStage } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.InterviewStageCreateArgs>({
  interviewStage: {
    one: {
      data: {
        title: 'String',
        pipelinePosition: 3037970,
        Requisition: {
          create: {
            title: 'String',
            wdRequisitionID: 756398,
            status: 'String',
            updatedAt: '2023-03-18T22:38:17.848Z',
            Customer: {
              create: {
                name: 'String8031906',
                vaultKey: 'String',
                updatedAt: '2023-03-18T22:38:17.848Z',
                status: 'PENDING',
              },
            },
            User: {
              create: {
                auth0ID: 'String8049169',
                email: 'String3535498',
                updatedAt: '2023-03-18T22:38:17.848Z',
                status: 'PENDING',
                customer: {
                  create: {
                    name: 'String8548326',
                    vaultKey: 'String',
                    updatedAt: '2023-03-18T22:38:17.848Z',
                    status: 'PENDING',
                  },
                },
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        pipelinePosition: 5690404,
        Requisition: {
          create: {
            title: 'String',
            wdRequisitionID: 1849767,
            status: 'String',
            updatedAt: '2023-03-18T22:38:17.848Z',
            Customer: {
              create: {
                name: 'String1773468',
                vaultKey: 'String',
                updatedAt: '2023-03-18T22:38:17.848Z',
                status: 'PENDING',
              },
            },
            User: {
              create: {
                auth0ID: 'String871114',
                email: 'String1717478',
                updatedAt: '2023-03-18T22:38:17.849Z',
                status: 'PENDING',
                customer: {
                  create: {
                    name: 'String2238931',
                    vaultKey: 'String',
                    updatedAt: '2023-03-18T22:38:17.849Z',
                    status: 'PENDING',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<InterviewStage, 'interviewStage'>;
