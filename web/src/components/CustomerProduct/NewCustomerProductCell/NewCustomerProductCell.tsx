import type { ProductsQuery } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import NewCustomerProduct from '../NewCustomerProduct/NewCustomerProduct';

export const QUERY = gql`
  query ProductsQuery {
    products {
      id
      title
      config
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
);

export const Success = ({ products }: CellSuccessProps<ProductsQuery>) => {
  return <NewCustomerProduct products={products} />;
};
