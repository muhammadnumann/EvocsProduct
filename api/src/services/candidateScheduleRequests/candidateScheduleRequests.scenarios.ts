import type { Prisma, CandidateScheduleRequest } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard =
  defineScenario<Prisma.CandidateScheduleRequestCreateArgs>({
    candidateScheduleRequest: {
      one: {
        data: {
          emailSentFromName: 'String',
          emailSentFromAddressAlias: 'String',
          emailSubject: 'String',
          emailBody: 'String',
          emailServiceMessageID: 'String',
          updatedAt: '2023-02-11T19:05:40.195Z',
          initiatingUser: {
            create: {
              auth0ID: 'String993331',
              email: 'String8663165',
              updatedAt: '2023-02-11T19:05:40.195Z',
              status: 'PENDING',
              customer: {
                create: {
                  name: 'String2204949',
                  vaultKey: 'String',
                  updatedAt: '2023-02-11T19:05:40.195Z',
                  status: 'PENDING',
                },
              },
            },
          },
          candidate: {
            create: {
              firstName: 'String',
              lastName: 'String',
              email: 'String',
              wdCandidateID: 'String',
              updatedAt: '2023-02-11T19:05:40.195Z',
              customer: {
                create: {
                  name: 'String7554190',
                  vaultKey: 'String',
                  updatedAt: '2023-02-11T19:05:40.195Z',
                  status: 'PENDING',
                },
              },
              user: {
                create: {
                  auth0ID: 'String744874',
                  email: 'String1826759',
                  updatedAt: '2023-02-11T19:05:40.195Z',
                  status: 'PENDING',
                  customer: {
                    create: {
                      name: 'String4273395',
                      vaultKey: 'String',
                      updatedAt: '2023-02-11T19:05:40.195Z',
                      status: 'PENDING',
                    },
                  },
                },
              },
            },
          },
          candidateSchedule: {
            create: {
              updatedAt: '2023-02-11T19:05:40.195Z',
              Candidate: {
                create: {
                  firstName: 'String',
                  lastName: 'String',
                  email: 'String',
                  wdCandidateID: 'String',
                  updatedAt: '2023-02-11T19:05:40.195Z',
                  customer: {
                    create: {
                      name: 'String4167892',
                      vaultKey: 'String',
                      updatedAt: '2023-02-11T19:05:40.195Z',
                      status: 'PENDING',
                    },
                  },
                  user: {
                    create: {
                      auth0ID: 'String1974874',
                      email: 'String1729810',
                      updatedAt: '2023-02-11T19:05:40.195Z',
                      status: 'PENDING',
                      customer: {
                        create: {
                          name: 'String7018535',
                          vaultKey: 'String',
                          updatedAt: '2023-02-11T19:05:40.195Z',
                          status: 'PENDING',
                        },
                      },
                    },
                  },
                },
              },
              Requsition: {
                create: {
                  owningCustomerID: 9463956,
                  owningUserID: 2247131,
                  title: 'String',
                  wdRequisitionID: 2643333,
                  status: 'String',
                  updatedAt: '2023-02-11T19:05:40.195Z',
                },
              },
            },
          },
        },
      },
      two: {
        data: {
          emailSentFromName: 'String',
          emailSentFromAddressAlias: 'String',
          emailSubject: 'String',
          emailBody: 'String',
          emailServiceMessageID: 'String',
          updatedAt: '2023-02-11T19:05:40.195Z',
          initiatingUser: {
            create: {
              auth0ID: 'String7903432',
              email: 'String8354786',
              updatedAt: '2023-02-11T19:05:40.195Z',
              status: 'PENDING',
              customer: {
                create: {
                  name: 'String312044',
                  vaultKey: 'String',
                  updatedAt: '2023-02-11T19:05:40.195Z',
                  status: 'PENDING',
                },
              },
            },
          },
          candidate: {
            create: {
              firstName: 'String',
              lastName: 'String',
              email: 'String',
              wdCandidateID: 'String',
              updatedAt: '2023-02-11T19:05:40.195Z',
              customer: {
                create: {
                  name: 'String4156395',
                  vaultKey: 'String',
                  updatedAt: '2023-02-11T19:05:40.195Z',
                  status: 'PENDING',
                },
              },
              user: {
                create: {
                  auth0ID: 'String4297175',
                  email: 'String9729041',
                  updatedAt: '2023-02-11T19:05:40.195Z',
                  status: 'PENDING',
                  customer: {
                    create: {
                      name: 'String2222938',
                      vaultKey: 'String',
                      updatedAt: '2023-02-11T19:05:40.195Z',
                      status: 'PENDING',
                    },
                  },
                },
              },
            },
          },
          candidateSchedule: {
            create: {
              updatedAt: '2023-02-11T19:05:40.195Z',
              Candidate: {
                create: {
                  firstName: 'String',
                  lastName: 'String',
                  email: 'String',
                  wdCandidateID: 'String',
                  updatedAt: '2023-02-11T19:05:40.195Z',
                  customer: {
                    create: {
                      name: 'String3726403',
                      vaultKey: 'String',
                      updatedAt: '2023-02-11T19:05:40.195Z',
                      status: 'PENDING',
                    },
                  },
                  user: {
                    create: {
                      auth0ID: 'String6334311',
                      email: 'String4204236',
                      updatedAt: '2023-02-11T19:05:40.195Z',
                      status: 'PENDING',
                      customer: {
                        create: {
                          name: 'String2305320',
                          vaultKey: 'String',
                          updatedAt: '2023-02-11T19:05:40.195Z',
                          status: 'PENDING',
                        },
                      },
                    },
                  },
                },
              },
              Requsition: {
                create: {
                  owningCustomerID: 7446782,
                  owningUserID: 7548778,
                  title: 'String',
                  wdRequisitionID: 8816786,
                  status: 'String',
                  updatedAt: '2023-02-11T19:05:40.195Z',
                },
              },
            },
          },
        },
      },
    },
  });

export type StandardScenario = ScenarioData<
  CandidateScheduleRequest,
  'candidateScheduleRequest'
>;
