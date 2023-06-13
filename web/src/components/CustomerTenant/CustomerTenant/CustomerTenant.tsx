/* eslint-disable @typescript-eslint/no-unused-vars */
import humanize from 'humanize-string';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

const DELETE_CUSTOMER_TENANT_MUTATION = gql`
  mutation DeleteCustomerTenantMutation($id: Int!) {
    deleteCustomerTenant(id: $id) {
      id
    }
  }
`;

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value));
      return humanizedValues.join(', ');
    } else {
      return humanize(values as string);
    }
  }
};

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  );
};

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  );
};

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />;
};

const CustomerTenant = ({ customerTenant }) => {
  const [deleteCustomerTenant] = useMutation(DELETE_CUSTOMER_TENANT_MUTATION, {
    onCompleted: () => {
      toast.success('Customer tenant deleted');
      navigate(routes.customerTenants());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete customer tenant ' + id + '?')
    ) {
      deleteCustomerTenant({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Customer Tenant {customerTenant.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{customerTenant.id}</td>
            </tr>
            <tr>
              <th>Customer id</th>
              <td>{customerTenant.customerID}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{customerTenant.url}</td>
            </tr>
            <tr>
              <th>Vault key</th>
              <td>{customerTenant.vaultKey}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCustomerTenant({ id: customerTenant.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(customerTenant.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default CustomerTenant;
