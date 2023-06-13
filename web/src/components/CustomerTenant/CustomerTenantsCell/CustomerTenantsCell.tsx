import type { FindCustomerTenants } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import CustomerTenants from 'src/components/CustomerTenant/CustomerTenants';

export const QUERY = gql`
  query FindCustomerTenants {
    customerTenants {
      id
      customerID
      url
      vaultKey
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No customer tenants yet. '}
      <Link to={routes.newCustomerTenant()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({
  customerTenants,
}: CellSuccessProps<FindCustomerTenants>) => {
  return <CustomerTenants customerTenants={customerTenants} />;
};
