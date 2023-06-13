import type { Prisma, InterviewSchedulerEvent } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard =
  defineScenario<Prisma.InterviewSchedulerEventCreateArgs>({
    interviewSchedulerEvent: {
      one: {
        data: {
          attendees: {
            create: [
              {
                attendeeURI: 'String',
                name: 'String',
                email: 'String',
                inviteStatus: 'PENDING',
                avatarURL: 'String',
              },
            ],
          },
          calendarProvider: 'GOOGLE',
          title: 'String',
          description: 'String',
          startTime: '2022-10-27T18:26:48Z',
          endTime: '2022-10-27T18:26:48Z',
          updatedAt: '2022-10-27T18:26:48Z',
          user: {
            create: {
              auth0ID: 'String8805508',
              email: 'String4079167',
              updatedAt: '2022-10-27T18:26:48Z',
              status: 'PENDING',
              customer: {
                create: {
                  name: 'String8433347',
                  vaultKey: 'String',
                  updatedAt: '2022-10-27T18:26:48Z',
                  status: 'PENDING',
                },
              },
            },
          },
          customer: {
            create: {
              name: 'String3395805',
              vaultKey: 'String',
              updatedAt: '2022-10-27T18:26:48Z',
              status: 'PENDING',
            },
          },
        },
      },
      two: {
        data: {
          attendees: {
            create: [
              {
                attendeeURI: 'String',
                name: 'String',
                email: 'String',
                inviteStatus: 'PENDING',
                avatarURL: 'String',
              },
            ],
          },
          calendarProvider: 'GOOGLE',
          title: 'String',
          description: 'String',
          startTime: '2022-10-27T18:26:48Z',
          endTime: '2022-10-27T18:26:48Z',
          updatedAt: '2022-10-27T18:26:48Z',
          user: {
            create: {
              auth0ID: 'String3110036',
              email: 'String3779143',
              updatedAt: '2022-10-27T18:26:48Z',
              status: 'PENDING',
              customer: {
                create: {
                  name: 'String3820433',
                  vaultKey: 'String',
                  updatedAt: '2022-10-27T18:26:48Z',
                  status: 'PENDING',
                },
              },
            },
          },
          customer: {
            create: {
              name: 'String6174461',
              vaultKey: 'String',
              updatedAt: '2022-10-27T18:26:48Z',
              status: 'PENDING',
            },
          },
        },
      },
    },
  });

export type StandardScenario = ScenarioData<
  InterviewSchedulerEvent,
  'interviewSchedulerEvent'
>;
