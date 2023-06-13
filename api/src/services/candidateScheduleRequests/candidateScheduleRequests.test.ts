import type { CandidateScheduleRequest } from '@prisma/client';

import {
  candidateScheduleRequests,
  candidateScheduleRequest,
  createCandidateScheduleRequest,
  updateCandidateScheduleRequest,
  deleteCandidateScheduleRequest,
} from './candidateScheduleRequests';
import type { StandardScenario } from './candidateScheduleRequests.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('candidateScheduleRequests', () => {
  scenario(
    'returns all candidateScheduleRequests',
    async (scenario: StandardScenario) => {
      const result = await candidateScheduleRequests();

      expect(result.length).toEqual(
        Object.keys(scenario.candidateScheduleRequest).length
      );
    }
  );

  scenario(
    'returns a single candidateScheduleRequest',
    async (scenario: StandardScenario) => {
      const result = await candidateScheduleRequest({
        id: scenario.candidateScheduleRequest.one.id,
      });

      expect(result).toEqual(scenario.candidateScheduleRequest.one);
    }
  );

  scenario(
    'creates a candidateScheduleRequest',
    async (scenario: StandardScenario) => {
      const result = await createCandidateScheduleRequest({
        input: {
          candidateID: scenario.candidateScheduleRequest.two.candidateID,
          initiatingUserID:
            scenario.candidateScheduleRequest.two.initiatingUserID,
          candidateScheduleID:
            scenario.candidateScheduleRequest.two.candidateScheduleID,
          emailSentFromName: 'String',
          emailSentFromAddressAlias: 'String',
          emailSubject: 'String',
          emailBody: 'String',
          emailServiceMessageID: 'String',
          updatedAt: '2023-02-11T19:05:40.104Z',
        },
      });

      expect(result.candidateID).toEqual(
        scenario.candidateScheduleRequest.two.candidateID
      );
      expect(result.initiatingUserID).toEqual(
        scenario.candidateScheduleRequest.two.initiatingUserID
      );
      expect(result.candidateScheduleID).toEqual(
        scenario.candidateScheduleRequest.two.candidateScheduleID
      );
      expect(result.emailSentFromName).toEqual('String');
      expect(result.emailSentFromAddressAlias).toEqual('String');
      expect(result.emailSubject).toEqual('String');
      expect(result.emailBody).toEqual('String');
      expect(result.emailServiceMessageID).toEqual('String');
      expect(result.updatedAt).toEqual(new Date('2023-02-11T19:05:40.104Z'));
    }
  );

  scenario(
    'updates a candidateScheduleRequest',
    async (scenario: StandardScenario) => {
      const original = (await candidateScheduleRequest({
        id: scenario.candidateScheduleRequest.one.id,
      })) as CandidateScheduleRequest;
      const result = await updateCandidateScheduleRequest({
        id: original.id,
        input: { emailSentFromName: 'String2' },
      });

      expect(result.emailSentFromName).toEqual('String2');
    }
  );

  scenario(
    'deletes a candidateScheduleRequest',
    async (scenario: StandardScenario) => {
      const original = (await deleteCandidateScheduleRequest({
        id: scenario.candidateScheduleRequest.one.id,
      })) as CandidateScheduleRequest;
      const result = await candidateScheduleRequest({ id: original.id });

      expect(result).toEqual(null);
    }
  );
});
