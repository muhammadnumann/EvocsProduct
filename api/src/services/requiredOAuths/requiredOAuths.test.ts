import type { RequiredOAuth } from '@prisma/client';

import {
  requiredOAuths,
  requiredOAuth,
  createRequiredOAuth,
  updateRequiredOAuth,
  deleteRequiredOAuth,
} from './requiredOAuths';
import type { StandardScenario } from './requiredOAuths.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('requiredOAuths', () => {
  scenario('returns all requiredOAuths', async (scenario: StandardScenario) => {
    const result = await requiredOAuths();

    expect(result.length).toEqual(Object.keys(scenario.requiredOAuth).length);
  });

  scenario(
    'returns a single requiredOAuth',
    async (scenario: StandardScenario) => {
      const result = await requiredOAuth({ id: scenario.requiredOAuth.one.id });

      expect(result).toEqual(scenario.requiredOAuth.one);
    }
  );

  scenario('creates a requiredOAuth', async (scenario: StandardScenario) => {
    const result = await createRequiredOAuth({
      input: {
        customerProductID: scenario.requiredOAuth.two.customerProductID,
        google: true,
        azureAD: true,
        adFS: true,
        ping: true,
        adLDAP: true,
        zoom: true,
      },
    });

    expect(result.customerProductID).toEqual(
      scenario.requiredOAuth.two.customerProductID
    );
    expect(result.google).toEqual(true);
    expect(result.azureAD).toEqual(true);
    expect(result.adFS).toEqual(true);
    expect(result.ping).toEqual(true);
    expect(result.adLDAP).toEqual(true);
  });

  scenario('updates a requiredOAuth', async (scenario: StandardScenario) => {
    const original = (await requiredOAuth({
      id: scenario.requiredOAuth.one.id,
    })) as RequiredOAuth;
    const result = await updateRequiredOAuth({
      id: original.id,
      input: { google: false },
    });

    expect(result.google).toEqual(false);
  });

  scenario('deletes a requiredOAuth', async (scenario: StandardScenario) => {
    const original = (await deleteRequiredOAuth({
      id: scenario.requiredOAuth.one.id,
    })) as RequiredOAuth;
    const result = await requiredOAuth({ id: original.id });

    expect(result).toEqual(null);
  });
});
