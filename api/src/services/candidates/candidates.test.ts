import type { Candidate } from '@prisma/client';

import {
  candidates,
  candidate,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} from './candidates';
import type { StandardScenario } from './candidates.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('candidates', () => {
  scenario('returns all candidates', async (scenario: StandardScenario) => {
    const result = await candidates();

    expect(result.length).toEqual(Object.keys(scenario.candidate).length);
  });

  scenario('returns a single candidate', async (scenario: StandardScenario) => {
    const result = await candidate({ id: scenario.candidate.one.id });

    expect(result).toEqual(scenario.candidate.one);
  });

  scenario('creates a candidate', async (scenario: StandardScenario) => {
    const result = await createCandidate({
      input: {
        owningCustomerID: scenario.candidate.two.owningCustomerID,
        addedByUserID: scenario.candidate.two.addedByUserID,
        firstName: 'String',
        lastName: 'String',
        email: 'String',
        wdCandidateID: 'String',
        updatedAt: '2023-02-11T17:50:16.456Z',
      },
    });

    expect(result.owningCustomerID).toEqual(
      scenario.candidate.two.owningCustomerID
    );
    expect(result.addedByUserID).toEqual(scenario.candidate.two.addedByUserID);
    expect(result.firstName).toEqual('String');
    expect(result.lastName).toEqual('String');
    expect(result.email).toEqual('String');
    expect(result.wdCandidateID).toEqual('String');
    expect(result.updatedAt).toEqual(new Date('2023-02-11T17:50:16.456Z'));
  });

  scenario('updates a candidate', async (scenario: StandardScenario) => {
    const original = (await candidate({
      id: scenario.candidate.one.id,
    })) as Candidate;
    const result = await updateCandidate({
      id: original.id,
      input: { firstName: 'String2' },
    });

    expect(result.firstName).toEqual('String2');
  });

  scenario('deletes a candidate', async (scenario: StandardScenario) => {
    const original = (await deleteCandidate({
      id: scenario.candidate.one.id,
    })) as Candidate;
    const result = await candidate({ id: original.id });

    expect(result).toEqual(null);
  });
});
