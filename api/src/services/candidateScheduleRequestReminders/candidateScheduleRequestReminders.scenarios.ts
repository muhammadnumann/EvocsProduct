import type { Prisma, CandidateScheduleRequestReminder } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard =
  defineScenario<Prisma.CandidateScheduleRequestReminderCreateArgs>({
    candidateScheduleRequestReminder: {
      one: {
        data: {
          emailServiceMessageID: 'String',
          updatedAt: '2023-02-11T17:51:30.439Z',
          candidateScheduleRequest: {
            create: {
              emailSentFromName: 'String',
              emailSentFromAddressAlias: 'String',
              emailSubject: 'String',
              emailBody: 'String',
              emailServiceMessageID: 'String',
              updatedAt: '2023-02-11T17:51:30.439Z',
              initiatingUser: {
                create: {
                  auth0ID: 'String6161900',
                  email: 'String6786480',
                  updatedAt: '2023-02-11T17:51:30.439Z',
                  status: 'PENDING',
                  customer: {
                    create: {
                      name: 'String4826471',
                      vaultKey: 'String',
                      updatedAt: '2023-02-11T17:51:30.439Z',
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
                  updatedAt: '2023-02-11T17:51:30.439Z',
                  customer: {
                    create: {
                      name: 'String6884951',
                      vaultKey: 'String',
                      updatedAt: '2023-02-11T17:51:30.439Z',
                      status: 'PENDING',
                    },
                  },
                  user: {
                    create: {
                      auth0ID: 'String2780103',
                      email: 'String6978133',
                      updatedAt: '2023-02-11T17:51:30.439Z',
                      status: 'PENDING',
                      customer: {
                        create: {
                          name: 'String8150578',
                          vaultKey: 'String',
                          updatedAt: '2023-02-11T17:51:30.439Z',
                          status: 'PENDING',
                        },
                      },
                    },
                  },
                },
              },
              candidateSchedule: {
                create: {
                  updatedAt: '2023-02-11T17:51:30.439Z',
                  Candidate: {
                    create: {
                      firstName: 'String',
                      lastName: 'String',
                      email: 'String',
                      wdCandidateID: 'String',
                      updatedAt: '2023-02-11T17:51:30.439Z',
                      customer: {
                        create: {
                          name: 'String6581394',
                          vaultKey: 'String',
                          updatedAt: '2023-02-11T17:51:30.439Z',
                          status: 'PENDING',
                        },
                      },
                      user: {
                        create: {
                          auth0ID: 'String5339129',
                          email: 'String4543724',
                          updatedAt: '2023-02-11T17:51:30.439Z',
                          status: 'PENDING',
                          customer: {
                            create: {
                              name: 'String2662777',
                              vaultKey: 'String',
                              updatedAt: '2023-02-11T17:51:30.439Z',
                              status: 'PENDING',
                            },
                          },
                        },
                      },
                    },
                  },
                  Requsition: {
                    create: {
                      owningCustomerID: 8802608,
                      owningUserID: 5568649,
                      title: 'String',
                      wdRequisitionID: 2705624,
                      status: 'String',
                      updatedAt: '2023-02-11T17:51:30.439Z',
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
          emailServiceMessageID: 'String',
          updatedAt: '2023-02-11T17:51:30.439Z',
          candidateScheduleRequest: {
            create: {
              emailSentFromName: 'String',
              emailSentFromAddressAlias: 'String',
              emailSubject: 'String',
              emailBody: 'String',
              emailServiceMessageID: 'String',
              updatedAt: '2023-02-11T17:51:30.439Z',
              initiatingUser: {
                create: {
                  auth0ID: 'String2299725',
                  email: 'String3300116',
                  updatedAt: '2023-02-11T17:51:30.439Z',
                  status: 'PENDING',
                  customer: {
                    create: {
                      name: 'String1469090',
                      vaultKey: 'String',
                      updatedAt: '2023-02-11T17:51:30.439Z',
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
                  updatedAt: '2023-02-11T17:51:30.439Z',
                  customer: {
                    create: {
                      name: 'String1653368',
                      vaultKey: 'String',
                      updatedAt: '2023-02-11T17:51:30.439Z',
                      status: 'PENDING',
                    },
                  },
                  user: {
                    create: {
                      auth0ID: 'String9069489',
                      email: 'String4465998',
                      updatedAt: '2023-02-11T17:51:30.439Z',
                      status: 'PENDING',
                      customer: {
                        create: {
                          name: 'String5250410',
                          vaultKey: 'String',
                          updatedAt: '2023-02-11T17:51:30.439Z',
                          status: 'PENDING',
                        },
                      },
                    },
                  },
                },
              },
              candidateSchedule: {
                create: {
                  updatedAt: '2023-02-11T17:51:30.439Z',
                  Candidate: {
                    create: {
                      firstName: 'String',
                      lastName: 'String',
                      email: 'String',
                      wdCandidateID: 'String',
                      updatedAt: '2023-02-11T17:51:30.439Z',
                      customer: {
                        create: {
                          name: 'String7709584',
                          vaultKey: 'String',
                          updatedAt: '2023-02-11T17:51:30.439Z',
                          status: 'PENDING',
                        },
                      },
                      user: {
                        create: {
                          auth0ID: 'String7734392',
                          email: 'String6236862',
                          updatedAt: '2023-02-11T17:51:30.439Z',
                          status: 'PENDING',
                          customer: {
                            create: {
                              name: 'String9458524',
                              vaultKey: 'String',
                              updatedAt: '2023-02-11T17:51:30.439Z',
                              status: 'PENDING',
                            },
                          },
                        },
                      },
                    },
                  },
                  Requsition: {
                    create: {
                      owningCustomerID: 8940302,
                      owningUserID: 3783289,
                      title: 'String',
                      wdRequisitionID: 8877471,
                      status: 'String',
                      updatedAt: '2023-02-11T17:51:30.439Z',
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
  CandidateScheduleRequestReminder,
  'candidateScheduleRequestReminder'
>;
