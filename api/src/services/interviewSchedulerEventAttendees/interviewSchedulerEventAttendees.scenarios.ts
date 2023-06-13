import type { Prisma, InterviewSchedulerEventAttendee } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard =
  defineScenario<Prisma.InterviewSchedulerEventAttendeeCreateArgs>({
    interviewSchedulerEventAttendee: {
      one: {
        data: {
          attendeeURI: 'String',
          email: 'String',
          name: 'String',
          inviteStatus: 'PENDING',
          interviewSchedulerEvent: {
            create: {
              calendarProvider: 'GOOGLE',
              title: 'String',
              description: 'String',
              startTime: '2022-11-07T17:20:13.426Z',
              endTime: '2022-11-07T17:20:13.426Z',
              updatedAt: '2022-11-07T17:20:13.426Z',
              user: {
                create: {
                  auth0ID: 'String6041485',
                  email: 'String6818614',
                  updatedAt: '2022-11-07T17:20:13.426Z',
                  status: 'PENDING',
                  customer: {
                    create: {
                      name: 'String7211901',
                      vaultKey: 'String',
                      updatedAt: '2022-11-07T17:20:13.426Z',
                      status: 'PENDING',
                    },
                  },
                },
              },
              customer: {
                create: {
                  name: 'String9227337',
                  vaultKey: 'String',
                  updatedAt: '2022-11-07T17:20:13.426Z',
                  status: 'PENDING',
                },
              },
            },
          },
        },
      },
      two: {
        data: {
          attendeeURI: 'String',
          email: 'String',
          name: 'String',
          inviteStatus: 'PENDING',
          interviewSchedulerEvent: {
            create: {
              calendarProvider: 'GOOGLE',
              title: 'String',
              description: 'String',
              startTime: '2022-11-07T17:20:13.427Z',
              endTime: '2022-11-07T17:20:13.427Z',
              updatedAt: '2022-11-07T17:20:13.427Z',
              user: {
                create: {
                  auth0ID: 'String472821',
                  email: 'String1755998',
                  updatedAt: '2022-11-07T17:20:13.427Z',
                  status: 'PENDING',
                  customer: {
                    create: {
                      name: 'String1728617',
                      vaultKey: 'String',
                      updatedAt: '2022-11-07T17:20:13.427Z',
                      status: 'PENDING',
                    },
                  },
                },
              },
              customer: {
                create: {
                  name: 'String870415',
                  vaultKey: 'String',
                  updatedAt: '2022-11-07T17:20:13.427Z',
                  status: 'PENDING',
                },
              },
            },
          },
        },
      },
    },
  });

export type StandardScenario = ScenarioData<
  InterviewSchedulerEventAttendee,
  'interviewSchedulerEventAttendee'
>;
