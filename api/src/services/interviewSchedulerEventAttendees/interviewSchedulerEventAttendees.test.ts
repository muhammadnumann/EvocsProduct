import type { InterviewSchedulerEventAttendee } from '@prisma/client';

import {
  interviewSchedulerEventAttendees,
  interviewSchedulerEventAttendee,
  createInterviewSchedulerEventAttendee,
  updateInterviewSchedulerEventAttendee,
  deleteInterviewSchedulerEventAttendee,
} from './interviewSchedulerEventAttendees';
import type { StandardScenario } from './interviewSchedulerEventAttendees.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('interviewSchedulerEventAttendees', () => {
  scenario(
    'returns all interviewSchedulerEventAttendees',
    async (scenario: StandardScenario) => {
      const result = await interviewSchedulerEventAttendees();

      expect(result.length).toEqual(
        Object.keys(scenario.interviewSchedulerEventAttendee).length
      );
    }
  );

  scenario(
    'returns a single interviewSchedulerEventAttendee',
    async (scenario: StandardScenario) => {
      const result = await interviewSchedulerEventAttendee({
        id: scenario.interviewSchedulerEventAttendee.one.id,
      });

      expect(result).toEqual(scenario.interviewSchedulerEventAttendee.one);
    }
  );

  scenario(
    'creates a interviewSchedulerEventAttendee',
    async (scenario: StandardScenario) => {
      const result = await createInterviewSchedulerEventAttendee({
        input: {
          eventID: scenario.interviewSchedulerEventAttendee.two.eventID,
          attendeeURI: 'String',
          name: 'String',
          email: 'String',
          inviteStatus: 'PENDING',
        },
      });

      expect(result.eventID).toEqual(
        scenario.interviewSchedulerEventAttendee.two.eventID
      );
      expect(result.attendeeURI).toEqual('String');
      expect(result.email).toEqual('String');
      expect(result.inviteStatus).toEqual('PENDING');
    }
  );

  scenario(
    'updates a interviewSchedulerEventAttendee',
    async (scenario: StandardScenario) => {
      const original = (await interviewSchedulerEventAttendee({
        id: scenario.interviewSchedulerEventAttendee.one.id,
      })) as InterviewSchedulerEventAttendee;
      const result = await updateInterviewSchedulerEventAttendee({
        id: original.id,
        input: { attendeeURI: 'String2' },
      });

      expect(result.attendeeURI).toEqual('String2');
    }
  );

  scenario(
    'deletes a interviewSchedulerEventAttendee',
    async (scenario: StandardScenario) => {
      const original = (await deleteInterviewSchedulerEventAttendee({
        id: scenario.interviewSchedulerEventAttendee.one.id,
      })) as InterviewSchedulerEventAttendee;
      const result = await interviewSchedulerEventAttendee({ id: original.id });

      expect(result).toEqual(null);
    }
  );
});
