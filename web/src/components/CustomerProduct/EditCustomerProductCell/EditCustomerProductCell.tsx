import type { EditCustomerProductById } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import CustomerProductForm from 'src/components/CustomerProduct/CustomerProductForm';

export const QUERY = gql`
  query EditCustomerProductById($id: Int!) {
    customerProduct: customerProduct(id: $id) {
      id
      productID
      customerID
      config
      createdAt
      updatedAt
    }
    products {
      id
      title
      config
    }
  }
`;
const UPDATE_CUSTOMER_PRODUCT_MUTATION = gql`
  mutation UpdateCustomerProductMutation(
    $id: Int!
    $input: UpdateCustomerProductInput!
  ) {
    updateCustomerProduct(id: $id, input: $input) {
      id
      productID
      customerID
      config
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Customer Product not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({
  customerProduct,
  products,
}: CellSuccessProps<EditCustomerProductById>) => {
  const [updateCustomerProduct, { loading, error }] = useMutation(
    UPDATE_CUSTOMER_PRODUCT_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerProduct updated');
        navigate(routes.customerProducts());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input, id) => {
    updateCustomerProduct({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit CustomerProduct {customerProduct.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CustomerProductForm
          customerProduct={customerProduct}
          onSave={onSave}
          error={error}
          loading={loading}
          products={products}
        />
      </div>
    </div>
  );
};
