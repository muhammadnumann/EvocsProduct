import type { FindCustomerProducts } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import CustomerProducts from 'src/components/CustomerProduct/CustomerProducts';

export const QUERY = gql`
  query FindCustomerProducts {
    customerProducts {
      id
      productID
      customerID
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No customerProducts yet. '}
      <Link to={routes.newCustomerProduct()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({
  customerProducts,
}: CellSuccessProps<FindCustomerProducts>) => {
  return <CustomerProducts customerProducts={customerProducts} />;
};
