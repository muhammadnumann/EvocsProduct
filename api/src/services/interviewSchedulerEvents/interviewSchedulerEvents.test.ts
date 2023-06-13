import type { InterviewSchedulerEvent } from '@prisma/client';

import {
  interviewSchedulerEvents,
  interviewSchedulerEvent,
  createInterviewSchedulerEvent,
  updateInterviewSchedulerEvent,
  deleteInterviewSchedulerEvent,
} from './interviewSchedulerEvents';
import type { StandardScenario } from './interviewSchedulerEvents.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('interviewSchedulerEvents', () => {
  scenario(
    'returns all interviewSchedulerEvents',
    async (scenario: StandardScenario) => {
      const result = await interviewSchedulerEvents();

      expect(result.length).toEqual(
        Object.keys(scenario.interviewSchedulerEvent).length
      );
    }
  );

  scenario(
    'returns a single interviewSchedulerEvent',
    async (scenario: StandardScenario) => {
      const result = await interviewSchedulerEvent({
        id: scenario.interviewSchedulerEvent.one.id,
      });

      expect(result).toEqual(scenario.interviewSchedulerEvent.one);
    }
  );

  scenario(
    'creates a interviewSchedulerEvent',
    async (scenario: StandardScenario) => {
      const result = await createInterviewSchedulerEvent({
        input: {
          userID: scenario.interviewSchedulerEvent.two.userID,
          attendees: [
            {
              eventID: 1,
              attendeeURI: 'String',
              name: 'String',
              email: 'String',
              inviteStatus: 'PENDING',
              avatarURL: 'String',
            },
          ],
          calendarProvider: 'GOOGLE',
          title: 'String',
          description: 'String',
          startTime: '2022-10-27T18:26:48Z',
          endTime: '2022-10-27T18:26:48Z',
        },
      });

      expect(result.userID).toEqual(
        scenario.interviewSchedulerEvent.two.userID
      );
      expect(result.customerID).toEqual(
        scenario.interviewSchedulerEvent.two.customerID
      );
      expect(result.attendees).toEqual('String');
      expect(result.calendarProvider).toEqual('GOOGLE');
      expect(result.title).toEqual('String');
      expect(result.description).toEqual('String');
      expect(result.startTime).toEqual('2022-10-27T18:26:48Z');
      expect(result.endTime).toEqual('2022-10-27T18:26:48Z');
      expect(result.updatedAt).toEqual('2022-10-27T18:26:48Z');
    }
  );

  scenario(
    'updates a interviewSchedulerEvent',
    async (scenario: StandardScenario) => {
      const original = (await interviewSchedulerEvent({
        id: scenario.interviewSchedulerEvent.one.id,
      })) as InterviewSchedulerEvent;
      const result = await updateInterviewSchedulerEvent({
        id: original.id,
        input: {
          attendees: [
            {
              attendeeURI: 'String2',
              name: 'String2',
              email: 'String2',
              inviteStatus: 'PENDING',
              avatarURL: 'String',
            },
          ],
        },
      });

      expect(result.attendees[0].attendeeURI).toEqual('String2');
      expect(result.attendees[0].email).toEqual('String2');
      expect(result.attendees[0].name).toEqual('String2');
    }
  );

  scenario(
    'deletes a interviewSchedulerEvent',
    async (scenario: StandardScenario) => {
      const original = (await deleteInterviewSchedulerEvent({
        id: scenario.interviewSchedulerEvent.one.id,
      })) as InterviewSchedulerEvent;
      const result = await interviewSchedulerEvent({ id: original.id });

      expect(result).toEqual(null);
    }
  );
});
