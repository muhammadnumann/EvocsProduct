import { mockUser } from '../mocks';

import {
  customers,
  customer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from './customers';
import type { StandardScenario } from './customers.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('customers', () => {
  scenario('returns all customers', async (scenario: StandardScenario) => {
    mockUser();
    const result = await customers();

    expect(result.length).toEqual(Object.keys(scenario.customer).length);
  });

  scenario('returns a single customer', async (scenario: StandardScenario) => {
    mockUser();
    const result = await customer({ id: scenario.customer.one.id });

    expect(result).toEqual(scenario.customer.one);
  });

  scenario('creates a customer', async () => {
    mockUser();
    const result = await createCustomer({
      input: {
        name: 'String6294497',
        status: 'PENDING',
        vaultKey: 'abc',
      },
    });

    expect(result.name).toEqual('String6294497');
    expect(result.status).toEqual('PENDING');
    expect(result.vaultKey).toEqual('abc');
  });

  scenario('updates a customer', async (scenario: StandardScenario) => {
    mockUser();
    const original = await customer({ id: scenario.customer.one.id });
    const result = await updateCustomer({
      id: original.id,
      input: { name: 'String52593082' },
    });

    expect(result.name).toEqual('String52593082');
  });

  scenario('deletes a customer', async (scenario: StandardScenario) => {
    mockUser();
    const original = await deleteCustomer({ id: scenario.customer.one.id });
    const result = await customer({ id: original.id });

    expect(result).toEqual(null);
  });
});
