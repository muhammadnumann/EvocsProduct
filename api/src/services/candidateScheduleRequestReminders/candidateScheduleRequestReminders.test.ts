import type { CandidateScheduleRequestReminder } from '@prisma/client';

import {
  candidateScheduleRequestReminders,
  candidateScheduleRequestReminder,
  createCandidateScheduleRequestReminder,
  updateCandidateScheduleRequestReminder,
  deleteCandidateScheduleRequestReminder,
} from './candidateScheduleRequestReminders';
import type { StandardScenario } from './candidateScheduleRequestReminders.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('candidateScheduleRequestReminders', () => {
  scenario(
    'returns all candidateScheduleRequestReminders',
    async (scenario: StandardScenario) => {
      const result = await candidateScheduleRequestReminders();

      expect(result.length).toEqual(
        Object.keys(scenario.candidateScheduleRequestReminder).length
      );
    }
  );

  scenario(
    'returns a single candidateScheduleRequestReminder',
    async (scenario: StandardScenario) => {
      const result = await candidateScheduleRequestReminder({
        id: scenario.candidateScheduleRequestReminder.one.id,
      });

      expect(result).toEqual(scenario.candidateScheduleRequestReminder.one);
    }
  );

  scenario(
    'creates a candidateScheduleRequestReminder',
    async (scenario: StandardScenario) => {
      const result = await createCandidateScheduleRequestReminder({
        input: {
          candidateScheduleRequestID:
            scenario.candidateScheduleRequestReminder.two
              .candidateScheduleRequestID,
          emailServiceMessageID: 'String',
          updatedAt: '2023-02-11T17:51:30.233Z',
        },
      });

      expect(result.candidateScheduleRequestID).toEqual(
        scenario.candidateScheduleRequestReminder.two.candidateScheduleRequestID
      );
      expect(result.emailServiceMessageID).toEqual('String');
      expect(result.updatedAt).toEqual(new Date('2023-02-11T17:51:30.233Z'));
    }
  );

  scenario(
    'updates a candidateScheduleRequestReminder',
    async (scenario: StandardScenario) => {
      const original = (await candidateScheduleRequestReminder({
        id: scenario.candidateScheduleRequestReminder.one.id,
      })) as CandidateScheduleRequestReminder;
      const result = await updateCandidateScheduleRequestReminder({
        id: original.id,
        input: { emailServiceMessageID: 'String2' },
      });

      expect(result.emailServiceMessageID).toEqual('String2');
    }
  );

  scenario(
    'deletes a candidateScheduleRequestReminder',
    async (scenario: StandardScenario) => {
      const original = (await deleteCandidateScheduleRequestReminder({
        id: scenario.candidateScheduleRequestReminder.one.id,
      })) as CandidateScheduleRequestReminder;
      const result = await candidateScheduleRequestReminder({
        id: original.id,
      });

      expect(result).toEqual(null);
    }
  );
});
