import type { InterviewStage } from '@prisma/client';

import {
  interviewStages,
  interviewStage,
  createInterviewStage,
  updateInterviewStage,
  deleteInterviewStage,
} from './interviewStages';
import type { StandardScenario } from './interviewStages.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('interviewStages', () => {
  scenario(
    'returns all interviewStages',
    async (scenario: StandardScenario) => {
      const result = await interviewStages();

      expect(result.length).toEqual(
        Object.keys(scenario.interviewStage).length
      );
    }
  );

  scenario(
    'returns a single interviewStage',
    async (scenario: StandardScenario) => {
      const result = await interviewStage({
        id: scenario.interviewStage.one.id,
      });

      expect(result).toEqual(scenario.interviewStage.one);
    }
  );

  scenario('creates a interviewStage', async (scenario: StandardScenario) => {
    const result = await createInterviewStage({
      input: {
        requisitionID: scenario.interviewStage.two.requisitionID,
        title: 'String',
        pipelinePosition: 4141998,
      },
    });

    expect(result.requisitionID).toEqual(
      scenario.interviewStage.two.requisitionID
    );
    expect(result.title).toEqual('String');
    expect(result.pipelinePosition).toEqual(4141998);
  });

  scenario('updates a interviewStage', async (scenario: StandardScenario) => {
    const original = (await interviewStage({
      id: scenario.interviewStage.one.id,
    })) as InterviewStage;
    const result = await updateInterviewStage({
      id: original.id,
      input: { title: 'String2' },
    });

    expect(result.title).toEqual('String2');
  });

  scenario('deletes a interviewStage', async (scenario: StandardScenario) => {
    const original = (await deleteInterviewStage({
      id: scenario.interviewStage.one.id,
    })) as InterviewStage;
    const result = await interviewStage({ id: original.id });

    expect(result).toEqual(null);
  });
});
