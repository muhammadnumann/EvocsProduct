import { FC } from 'react';

import { ProductsQuery } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import CustomerProductForm from 'src/components/CustomerProduct/CustomerProductForm';

const CREATE_CUSTOMER_PRODUCT_MUTATION = gql`
  mutation CreateCustomerProductMutation($input: CreateCustomerProductInput!) {
    createCustomerProduct(input: $input) {
      id
    }
  }
`;

type Props = {
  products: ProductsQuery['products'];
};
const NewCustomerProduct: FC<Props> = ({ products }) => {
  const [createCustomerProduct, { loading, error }] = useMutation(
    CREATE_CUSTOMER_PRODUCT_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerProduct created');
        navigate(routes.customerProducts());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input) => {
    createCustomerProduct({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New Customer Product
        </h2>
      </header>
      <div className="rw-segment-main">
        <CustomerProductForm
          onSave={onSave}
          loading={loading}
          error={error}
          products={products}
        />
      </div>
    </div>
  );
};

export default NewCustomerProduct;
