import { mockUser } from '../mocks';

import { jobs, job, createJob, updateJob, deleteJob } from './jobs';
import type { StandardScenario } from './jobs.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('jobs', () => {
  scenario('returns all jobs', async (scenario: StandardScenario) => {
    mockUser();
    const result = await jobs();

    expect(result.length).toEqual(Object.keys(scenario.job).length);
  });

  scenario('returns a single job', async (scenario: StandardScenario) => {
    mockUser();
    const result = await job({ id: scenario.job.one.id });

    expect(result).toEqual(scenario.job.one);
  });

  scenario('creates a job', async (scenario: StandardScenario) => {
    mockUser();
    const result = await createJob({
      input: {
        status: 'PENDING',
        initiatingUserID: scenario.job.two.initiatingUserID,
        productID: scenario.job.two.productID,
      },
    });

    expect(result.status).toEqual('PENDING');
    expect(result.initiatingUserID).toEqual(scenario.job.two.initiatingUserID);
    expect(result.productID).toEqual(scenario.job.two.productID);
  });

  scenario('updates a job', async (scenario: StandardScenario) => {
    mockUser();
    const original = await job({ id: scenario.job.one.id });
    const result = await updateJob({
      id: original.id,
      input: { status: 'FAILED' },
    });

    expect(result.status).toEqual('FAILED');
  });

  scenario('deletes a job', async (scenario: StandardScenario) => {
    mockUser();
    const original = await deleteJob({ id: scenario.job.one.id });
    const result = await job({ id: original.id });

    expect(result).toEqual(null);
  });
});
