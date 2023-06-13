import type { ConfiguredOAuth } from '@prisma/client';

import {
  configuredOAuths,
  configuredOAuth,
  createConfiguredOAuth,
  updateConfiguredOAuth,
  deleteConfiguredOAuth,
} from './configuredOAuths';
import type { StandardScenario } from './configuredOAuths.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('configuredOAuths', () => {
  scenario(
    'returns all configuredOAuths',
    async (scenario: StandardScenario) => {
      const result = await configuredOAuths();

      expect(result.length).toEqual(
        Object.keys(scenario.configuredOAuth).length
      );
    }
  );

  scenario(
    'returns a single configuredOAuth',
    async (scenario: StandardScenario) => {
      const result = await configuredOAuth({
        id: scenario.configuredOAuth.one.id,
      });

      expect(result).toEqual(scenario.configuredOAuth.one);
    }
  );

  scenario('creates a configuredOAuth', async (scenario: StandardScenario) => {
    const result = await createConfiguredOAuth({
      input: {
        userID: scenario.configuredOAuth.two.userID,
        customerProductID: scenario.configuredOAuth.two.customerProductID,
        accessToken: 'String',
        refreshToken: 'String',
        expiryDate: '2023-01-24T16:40:02.782Z',
        provider: 'GOOGLE_WORKSPACE',
        updatedAt: '2023-01-24T16:40:02.782Z',
      },
    });

    expect(result.userID).toEqual(scenario.configuredOAuth.two.userID);
    expect(result.customerProductID).toEqual(
      scenario.configuredOAuth.two.customerProductID
    );
    expect(result.accessToken).toEqual('String');
    expect(result.refreshToken).toEqual('String');
    expect(result.expiryDate).toEqual(new Date('2023-01-24T16:40:02.782Z'));
    expect(result.provider).toEqual('GOOGLE_WORKSPACE');
    expect(result.updatedAt).toEqual(new Date('2023-01-24T16:40:02.782Z'));
  });

  scenario('updates a configuredOAuth', async (scenario: StandardScenario) => {
    const original = (await configuredOAuth({
      id: scenario.configuredOAuth.one.id,
    })) as ConfiguredOAuth;
    const result = await updateConfiguredOAuth({
      id: original.id,
      input: { accessToken: 'String2' },
    });

    expect(result.accessToken).toEqual('String2');
  });

  scenario('deletes a configuredOAuth', async (scenario: StandardScenario) => {
    const original = (await deleteConfiguredOAuth({
      id: scenario.configuredOAuth.one.id,
    })) as ConfiguredOAuth;
    const result = await configuredOAuth({ id: original.id });

    expect(result).toEqual(null);
  });
});
