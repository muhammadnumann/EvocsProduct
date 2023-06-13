import { mockUser } from '../mocks';

import {
  customerTenants,
  customerTenant,
  createCustomerTenant,
  updateCustomerTenant,
  deleteCustomerTenant,
} from './customerTenants';
import type { StandardScenario } from './customerTenants.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('customerTenants', () => {
  scenario(
    'returns all customerTenants',
    async (scenario: StandardScenario) => {
      mockUser();
      const result = await customerTenants();

      expect(result.length).toEqual(
        Object.keys(scenario.customerTenant).length
      );
    }
  );

  scenario(
    'returns a single customerTenant',
    async (scenario: StandardScenario) => {
      mockUser();
      const result = await customerTenant({
        id: scenario.customerTenant.one.id,
      });

      expect(result).toEqual(scenario.customerTenant.one);
    }
  );

  scenario('creates a customerTenant', async (scenario: StandardScenario) => {
    mockUser();
    const result = await createCustomerTenant({
      input: {
        customerID: scenario.customerTenant.two.customerID,
        url: 'String',
      },
    });

    expect(result.customerID).toEqual(scenario.customerTenant.two.customerID);
    expect(result.url).toEqual('String');
  });

  scenario('updates a customerTenant', async (scenario: StandardScenario) => {
    mockUser();
    const original = await customerTenant({
      id: scenario.customerTenant.one.id,
    });
    const result = await updateCustomerTenant({
      id: original.id,
      input: { url: 'String2' },
    });

    expect(result.url).toEqual('String2');
  });

  scenario('deletes a customerTenant', async (scenario: StandardScenario) => {
    mockUser();
    const original = await deleteCustomerTenant({
      id: scenario.customerTenant.one.id,
    });
    const result = await customerTenant({ id: original.id });

    expect(result).toEqual(null);
  });
});
