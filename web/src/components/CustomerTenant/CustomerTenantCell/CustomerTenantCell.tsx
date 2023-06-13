import type { FindCustomerTenantById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import CustomerTenant from 'src/components/CustomerTenant/CustomerTenant';

export const QUERY = gql`
  query FindCustomerTenantById($id: Int!) {
    customerTenant: customerTenant(id: $id) {
      id
      customerID
      url
      vaultKey
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Customer tenant not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({
  customerTenant,
}: CellSuccessProps<FindCustomerTenantById>) => {
  return <CustomerTenant customerTenant={customerTenant} />;
};
