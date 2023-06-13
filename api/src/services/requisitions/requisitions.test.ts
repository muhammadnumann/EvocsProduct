import type { Requisition } from '@prisma/client';

import {
  requisitions,
  requisition,
  createRequisition,
  updateRequisition,
  deleteRequisition,
} from './requisitions';
import type { StandardScenario } from './requisitions.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('requisitions', () => {
  scenario('returns all requisitions', async (scenario: StandardScenario) => {
    const result = await requisitions();

    expect(result.length).toEqual(Object.keys(scenario.requisition).length);
  });

  scenario(
    'returns a single requisition',
    async (scenario: StandardScenario) => {
      const result = await requisition({ id: scenario.requisition.one.id });

      expect(result).toEqual(scenario.requisition.one);
    }
  );

  scenario('creates a requisition', async (scenario: StandardScenario) => {
    const result = await createRequisition({
      input: {
        owningCustomerID: scenario.requisition.two.owningCustomerID,
        owningUserID: 4468245,
        title: 'String',
        requisitionID: 7509285,
        status: 'String',
        updatedAt: '2023-02-11T22:10:50.913Z',
      },
    });

    expect(result.owningCustomerID).toEqual(
      scenario.requisition.two.owningCustomerID
    );
    expect(result.owningUserID).toEqual(4468245);
    expect(result.title).toEqual('String');
    expect(result.requisitionID).toEqual(7509285);
    expect(result.status).toEqual('String');
    expect(result.updatedAt).toEqual(new Date('2023-02-11T22:10:50.913Z'));
  });

  scenario('updates a requisition', async (scenario: StandardScenario) => {
    const original = (await requisition({
      id: scenario.requisition.one.id,
    })) as Requisition;
    const result = await updateRequisition({
      id: original.id,
      input: { owningUserID: 3020661 },
    });

    expect(result.owningUserID).toEqual(3020661);
  });

  scenario('deletes a requisition', async (scenario: StandardScenario) => {
    const original = (await deleteRequisition({
      id: scenario.requisition.one.id,
    })) as Requisition;
    const result = await requisition({ id: original.id });

    expect(result).toEqual(null);
  });
});
