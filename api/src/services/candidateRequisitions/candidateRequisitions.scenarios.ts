import type { Prisma, CandidateRequisition } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.CandidateRequisitionCreateArgs>({
  candidateRequisition: {
    one: {
      data: {
        status: 'String',
        updatedAt: '2023-02-27T05:07:04.881Z',
        Candidate: {
          create: {
            firstName: 'String',
            lastName: 'String',
            email: 'String',
            wdCandidateID: 'String4136209',
            updatedAt: '2023-02-27T05:07:04.881Z',
            customer: {
              create: {
                name: 'String8848446',
                vaultKey: 'String',
                updatedAt: '2023-02-27T05:07:04.881Z',
                status: 'PENDING',
              },
            },
            user: {
              create: {
                auth0ID: 'String9324930',
                email: 'String8647028',
                updatedAt: '2023-02-27T05:07:04.881Z',
                status: 'PENDING',
                customer: {
                  create: {
                    name: 'String5587305',
                    vaultKey: 'String',
                    updatedAt: '2023-02-27T05:07:04.881Z',
                    status: 'PENDING',
                  },
                },
              },
            },
          },
        },
        Requisition: {
          create: {
            title: 'String',
            wdRequisitionID: 245909,
            status: 'String',
            updatedAt: '2023-02-27T05:07:04.881Z',
            Customer: {
              create: {
                name: 'String2528833',
                vaultKey: 'String',
                updatedAt: '2023-02-27T05:07:04.881Z',
                status: 'PENDING',
              },
            },
            User: {
              create: {
                auth0ID: 'String2445509',
                email: 'String4322850',
                updatedAt: '2023-02-27T05:07:04.881Z',
                status: 'PENDING',
                customer: {
                  create: {
                    name: 'String7681937',
                    vaultKey: 'String',
                    updatedAt: '2023-02-27T05:07:04.881Z',
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
        status: 'String',
        updatedAt: '2023-02-27T05:07:04.881Z',
        Candidate: {
          create: {
            firstName: 'String',
            lastName: 'String',
            email: 'String',
            wdCandidateID: 'String3525940',
            updatedAt: '2023-02-27T05:07:04.881Z',
            customer: {
              create: {
                name: 'String769203',
                vaultKey: 'String',
                updatedAt: '2023-02-27T05:07:04.881Z',
                status: 'PENDING',
              },
            },
            user: {
              create: {
                auth0ID: 'String6994892',
                email: 'String3965647',
                updatedAt: '2023-02-27T05:07:04.881Z',
                status: 'PENDING',
                customer: {
                  create: {
                    name: 'String8651657',
                    vaultKey: 'String',
                    updatedAt: '2023-02-27T05:07:04.881Z',
                    status: 'PENDING',
                  },
                },
              },
            },
          },
        },
        Requisition: {
          create: {
            title: 'String',
            wdRequisitionID: 2130085,
            status: 'String',
            updatedAt: '2023-02-27T05:07:04.881Z',
            Customer: {
              create: {
                name: 'String4799111',
                vaultKey: 'String',
                updatedAt: '2023-02-27T05:07:04.881Z',
                status: 'PENDING',
              },
            },
            User: {
              create: {
                auth0ID: 'String5724386',
                email: 'String1571713',
                updatedAt: '2023-02-27T05:07:04.881Z',
                status: 'PENDING',
                customer: {
                  create: {
                    name: 'String2753154',
                    vaultKey: 'String',
                    updatedAt: '2023-02-27T05:07:04.881Z',
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

export type StandardScenario = ScenarioData<
  CandidateRequisition,
  'candidateRequisition'
>;
