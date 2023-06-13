import type { FindCustomerProductById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import CustomerProduct from 'src/components/CustomerProduct/CustomerProduct';

export const QUERY = gql`
  query FindCustomerProductById($id: Int!) {
    customerProduct: customerProduct(id: $id) {
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

export const Empty = () => <div>CustomerProduct not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({
  customerProduct,
}: CellSuccessProps<FindCustomerProductById>) => {
  return <CustomerProduct customerProduct={customerProduct} />;
};
