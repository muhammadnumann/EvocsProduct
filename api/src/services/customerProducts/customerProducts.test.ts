import { mockUser } from '../mocks';

import {
  customerProducts,
  customerProduct,
  createCustomerProduct,
  updateCustomerProduct,
  deleteCustomerProduct,
} from './customerProducts';
import type { StandardScenario } from './customerProducts.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('customerProducts', () => {
  scenario(
    'returns all customerProducts',
    async (scenario: StandardScenario) => {
      mockUser();
      const result = await customerProducts();

      expect(result.length).toEqual(
        Object.keys(scenario.customerProduct).length
      );
    }
  );

  scenario(
    'returns a single customerProduct',
    async (scenario: StandardScenario) => {
      mockUser();
      const result = await customerProduct({
        id: scenario.customerProduct.one.id,
      });

      expect(result).toEqual(scenario.customerProduct.one);
    }
  );

  scenario('creates a customerProduct', async (scenario: StandardScenario) => {
    mockUser();
    const result = await createCustomerProduct({
      input: {
        productID: scenario.customerProduct.two.productID,
        customerID: scenario.customerProduct.two.customerID,
        config: `{ "foo": "bar" }`,
      },
    });

    expect(result.productID).toEqual(scenario.customerProduct.two.productID);
    expect(result.customerID).toEqual(scenario.customerProduct.two.customerID);
    expect(result.config).toEqual(`{ "foo": "bar" }`);
  });

  scenario('updates a customerProduct', async (scenario: StandardScenario) => {
    mockUser();
    const original = await customerProduct({
      id: scenario.customerProduct.one.id,
    });
    const result = await updateCustomerProduct({
      id: original.id,
      input: {
        config: `{ "foo": "baz" }`,
        customerID: scenario.customerProduct.one.customerID,
      },
    });

    expect(result.config).toEqual(`{ foo: 'baz' }`);
  });

  scenario('deletes a customerProduct', async (scenario: StandardScenario) => {
    mockUser();
    const original = await deleteCustomerProduct({
      id: scenario.customerProduct.one.id,
    });
    const result = await customerProduct({ id: original.id });

    expect(result).toEqual(null);
  });
});
