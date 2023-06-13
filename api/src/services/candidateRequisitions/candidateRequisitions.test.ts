import type { CandidateRequisition } from '@prisma/client';

import {
  candidateRequisitions,
  candidateRequisition,
  createCandidateRequisition,
  updateCandidateRequisition,
  deleteCandidateRequisition,
} from './candidateRequisitions';
import type { StandardScenario } from './candidateRequisitions.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('candidateRequisitions', () => {
  scenario(
    'returns all candidateRequisitions',
    async (scenario: StandardScenario) => {
      const result = await candidateRequisitions();

      expect(result.length).toEqual(
        Object.keys(scenario.candidateRequisition).length
      );
    }
  );

  scenario(
    'returns a single candidateRequisition',
    async (scenario: StandardScenario) => {
      const result = await candidateRequisition({
        id: scenario.candidateRequisition.one.id,
      });

      expect(result).toEqual(scenario.candidateRequisition.one);
    }
  );

  scenario(
    'creates a candidateRequisition',
    async (scenario: StandardScenario) => {
      const result = await createCandidateRequisition({
        input: {
          candidateID: scenario.candidateRequisition.two.candidateID,
          requisitionID: scenario.candidateRequisition.two.requisitionID,
          status: 'String',
          updatedAt: '2023-02-27T05:07:04.716Z',
        },
      });

      expect(result.candidateID).toEqual(
        scenario.candidateRequisition.two.candidateID
      );
      expect(result.requisitionID).toEqual(
        scenario.candidateRequisition.two.requisitionID
      );
      expect(result.status).toEqual('String');
      expect(result.updatedAt).toEqual(new Date('2023-02-27T05:07:04.716Z'));
    }
  );

  scenario(
    'updates a candidateRequisition',
    async (scenario: StandardScenario) => {
      const original = (await candidateRequisition({
        id: scenario.candidateRequisition.one.id,
      })) as CandidateRequisition;
      const result = await updateCandidateRequisition({
        id: original.id,
        input: { status: 'String2' },
      });

      expect(result.status).toEqual('String2');
    }
  );

  scenario(
    'deletes a candidateRequisition',
    async (scenario: StandardScenario) => {
      const original = (await deleteCandidateRequisition({
        id: scenario.candidateRequisition.one.id,
      })) as CandidateRequisition;
      const result = await candidateRequisition({ id: original.id });

      expect(result).toEqual(null);
    }
  );
});
