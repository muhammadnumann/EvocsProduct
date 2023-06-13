import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import CustomerTenantForm from 'src/components/CustomerTenant/CustomerTenantForm';

const CREATE_CUSTOMER_TENANT_MUTATION = gql`
  mutation CreateCustomerTenantMutation($input: CreateCustomerTenantInput!) {
    createCustomerTenant(input: $input) {
      id
    }
  }
`;

const NewCustomerTenant = () => {
  const [createCustomerTenant, { loading, error }] = useMutation(
    CREATE_CUSTOMER_TENANT_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerTenant created');
        navigate(routes.customerTenants());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input) => {
    createCustomerTenant({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New CustomerTenant</h2>
      </header>
      <div className="rw-segment-main">
        <CustomerTenantForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewCustomerTenant;
