import type { EditCustomerTenantById } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import CustomerTenantForm from 'src/components/CustomerTenant/CustomerTenantForm';

export const QUERY = gql`
  query EditCustomerTenantById($id: Int!) {
    customerTenant: customerTenant(id: $id) {
      id
      customerID
      url
      vaultKey
    }
  }
`;
const UPDATE_CUSTOMER_TENANT_MUTATION = gql`
  mutation UpdateCustomerTenantMutation(
    $id: Int!
    $input: UpdateCustomerTenantInput!
  ) {
    updateCustomerTenant(id: $id, input: $input) {
      id
      customerID
      url
      vaultKey
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({
  customerTenant,
}: CellSuccessProps<EditCustomerTenantById>) => {
  const [updateCustomerTenant, { loading, error }] = useMutation(
    UPDATE_CUSTOMER_TENANT_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerTenant updated');
        navigate(routes.customerTenants());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input, id) => {
    updateCustomerTenant({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit CustomerTenant {customerTenant.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CustomerTenantForm
          customerTenant={customerTenant}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
