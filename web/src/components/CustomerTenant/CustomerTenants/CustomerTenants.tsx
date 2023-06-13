/* eslint-disable @typescript-eslint/no-unused-vars */
import humanize from 'humanize-string';

import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/CustomerTenant/CustomerTenantsCell';

const DELETE_CUSTOMER_TENANT_MUTATION = gql`
  mutation DeleteCustomerTenantMutation($id: Int!) {
    deleteCustomerTenant(id: $id) {
      id
    }
  }
`;

const MAX_STRING_LENGTH = 150;

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

const truncate = (text) => {
  let output = text;
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...';
  }
  return output;
};

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2));
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

const CustomerTenantsList = ({ customerTenants }) => {
  const [deleteCustomerTenant] = useMutation(DELETE_CUSTOMER_TENANT_MUTATION, {
    onCompleted: () => {
      toast.success('Customer tenant deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete customer tenant ' + id + '?')
    ) {
      deleteCustomerTenant({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Customer id</th>
            <th>Url</th>
            <th>Vault key</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {customerTenants.map((customerTenant) => (
            <tr key={customerTenant.id}>
              <td>{truncate(customerTenant.id)}</td>
              <td>{truncate(customerTenant.customerID)}</td>
              <td>{truncate(customerTenant.url)}</td>
              <td>{truncate(customerTenant.vaultKey)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.customerTenant({ id: customerTenant.id })}
                    title={
                      'Show customerTenant ' + customerTenant.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCustomerTenant({ id: customerTenant.id })}
                    title={'Edit customerTenant ' + customerTenant.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete customerTenant ' + customerTenant.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(customerTenant.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTenantsList;
