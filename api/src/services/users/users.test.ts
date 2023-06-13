import { mockUser } from '../mocks';

import { users, user, createUser, updateUser, deleteUser } from './users';
import type { StandardScenario } from './users.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('users', () => {
  scenario('returns all users', async (scenario: StandardScenario) => {
    mockUser();
    const result = await users();

    expect(result.length).toEqual(Object.keys(scenario.user).length);
  });

  scenario('returns a single user', async (scenario: StandardScenario) => {
    mockUser();
    const result = await user({ id: scenario.user.one.id });

    expect(result).toEqual(scenario.user.one);
  });

  scenario('creates a user', async (scenario: StandardScenario) => {
    mockUser();
    const result = await createUser({
      input: {
        auth0ID: 'String2838753',
        email: 'String4214931',
        customerID: scenario.user.two.customerID,
        status: 'PENDING',
      },
    });

    expect(result.auth0ID).toEqual('String2838753');
    expect(result.email).toEqual('String4214931');
    expect(result.customerID).toEqual(scenario.user.two.customerID);
    expect(result.status).toEqual('PENDING');
  });

  scenario('updates a user', async (scenario: StandardScenario) => {
    mockUser();
    const original = await user({ id: scenario.user.one.id });
    const result = await updateUser({
      id: original.id,
      input: { auth0ID: 'String16296722' },
    });

    expect(result.auth0ID).toEqual('String16296722');
  });

  scenario('deletes a user', async (scenario: StandardScenario) => {
    mockUser();
    const original = await deleteUser({ id: scenario.user.one.id });
    const result = await user({ id: original.id });

    expect(result).toEqual(null);
  });
});
