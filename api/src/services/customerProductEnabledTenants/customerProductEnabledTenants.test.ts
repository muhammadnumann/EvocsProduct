import { mockUser } from '../mocks';

import {
  customerProductEnabledTenants,
  customerProductEnabledTenant,
  createCustomerProductEnabledTenant,
  updateCustomerProductEnabledTenant,
  deleteCustomerProductEnabledTenant,
} from './customerProductEnabledTenants';
import type { StandardScenario } from './customerProductEnabledTenants.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('customerProductEnabledTenants', () => {
  scenario(
    'returns all customerProductEnabledTenants',
    async (scenario: StandardScenario) => {
      mockUser();
      const result = await customerProductEnabledTenants();

      expect(result.length).toEqual(
        Object.keys(scenario.customerProductEnabledTenant).length
      );
    }
  );

  scenario(
    'returns a single customerProductEnabledTenant',
    async (scenario: StandardScenario) => {
      mockUser();
      const result = await customerProductEnabledTenant({
        id: scenario.customerProductEnabledTenant.one.id,
      });

      expect(result).toEqual(scenario.customerProductEnabledTenant.one);
    }
  );

  scenario(
    'creates a customerProductEnabledTenant',
    async (scenario: StandardScenario) => {
      mockUser();
      const result = await createCustomerProductEnabledTenant({
        input: {
          customerProductID:
            scenario.customerProductEnabledTenant.two.customerProductID,
          customerTenantID:
            scenario.customerProductEnabledTenant.two.customerTenantID,
        },
      });

      expect(result.customerProductID).toEqual(
        scenario.customerProductEnabledTenant.two.customerProductID
      );
      expect(result.customerTenantID).toEqual(
        scenario.customerProductEnabledTenant.two.customerTenantID
      );
    }
  );

  scenario(
    'updates a customerProductEnabledTenant',
    async (scenario: StandardScenario) => {
      mockUser();
      const original = await customerProductEnabledTenant({
        id: scenario.customerProductEnabledTenant.one.id,
      });
      const result = await updateCustomerProductEnabledTenant({
        id: original.id,
        input: {
          customerProductID:
            scenario.customerProductEnabledTenant.two.customerProductID,
        },
      });

      expect(result.customerProductID).toEqual(
        scenario.customerProductEnabledTenant.two.customerProductID
      );
    }
  );

  scenario(
    'deletes a customerProductEnabledTenant',
    async (scenario: StandardScenario) => {
      mockUser();
      const original = await deleteCustomerProductEnabledTenant({
        id: scenario.customerProductEnabledTenant.one.id,
      });
      const result = await customerProductEnabledTenant({ id: original.id });

      expect(result).toEqual(null);
    }
  );
});
