import type { CandidateSchedule } from '@prisma/client';

import {
  candidateSchedules,
  candidateSchedule,
  createCandidateSchedule,
  updateCandidateSchedule,
  deleteCandidateSchedule,
} from './candidateSchedules';
import type { StandardScenario } from './candidateSchedules.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('candidateSchedules', () => {
  scenario(
    'returns all candidateSchedules',
    async (scenario: StandardScenario) => {
      const result = await candidateSchedules();

      expect(result.length).toEqual(
        Object.keys(scenario.candidateSchedule).length
      );
    }
  );

  scenario(
    'returns a single candidateSchedule',
    async (scenario: StandardScenario) => {
      const result = await candidateSchedule({
        id: scenario.candidateSchedule.one.id,
      });

      expect(result).toEqual(scenario.candidateSchedule.one);
    }
  );

  scenario(
    'creates a candidateSchedule',
    async (scenario: StandardScenario) => {
      const result = await createCandidateSchedule({
        input: {
          candidateID: scenario.candidateSchedule.two.candidateID,
          requisitionID: scenario.candidateSchedule.two.requisitionID,
          updatedAt: '2023-02-11T17:50:52.577Z',
        },
      });

      expect(result.candidateID).toEqual(
        scenario.candidateSchedule.two.candidateID
      );
      expect(result.requisitionID).toEqual(
        scenario.candidateSchedule.two.requisitionID
      );
      expect(result.updatedAt).toEqual(new Date('2023-02-11T17:50:52.577Z'));
    }
  );

  scenario(
    'updates a candidateSchedule',
    async (scenario: StandardScenario) => {
      const original = (await candidateSchedule({
        id: scenario.candidateSchedule.one.id,
      })) as CandidateSchedule;
      const result = await updateCandidateSchedule({
        id: original.id,
        input: { updatedAt: '2023-02-12T17:50:52.577Z' },
      });

      expect(result.updatedAt).toEqual(new Date('2023-02-12T17:50:52.577Z'));
    }
  );

  scenario(
    'deletes a candidateSchedule',
    async (scenario: StandardScenario) => {
      const original = (await deleteCandidateSchedule({
        id: scenario.candidateSchedule.one.id,
      })) as CandidateSchedule;
      const result = await candidateSchedule({ id: original.id });

      expect(result).toEqual(null);
    }
  );
});
