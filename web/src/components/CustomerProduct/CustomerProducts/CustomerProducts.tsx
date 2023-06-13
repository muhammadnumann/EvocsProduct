import humanize from 'humanize-string';

import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/CustomerProduct/CustomerProductsCell';

const DELETE_CUSTOMER_PRODUCT_MUTATION = gql`
  mutation DeleteCustomerProductMutation($id: Int!) {
    deleteCustomerProduct(id: $id) {
      id
    }
  }
`;

const MAX_STRING_LENGTH = 150;

const _formatEnum = (values: string | string[] | null | undefined) => {
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

const _jsonTruncate = (obj) => {
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

const _checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />;
};

const CustomerProductsList = ({ customerProducts }) => {
  const [deleteCustomerProduct] = useMutation(
    DELETE_CUSTOMER_PRODUCT_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerProduct deleted');
      },
      onError: (error) => {
        toast.error(error.message);
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  );

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete customerProduct ' + id + '?')
    ) {
      deleteCustomerProduct({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Product id</th>
            <th>Customer id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {customerProducts.map((customerProduct) => (
            <tr key={customerProduct.id}>
              <td>{truncate(customerProduct.id)}</td>
              <td>{truncate(customerProduct.productID)}</td>
              <td>{truncate(customerProduct.customerID)}</td>
              <td>{timeTag(customerProduct.createdAt)}</td>
              <td>{timeTag(customerProduct.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.customerProduct({ id: customerProduct.id })}
                    title={
                      'Show customerProduct ' + customerProduct.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCustomerProduct({ id: customerProduct.id })}
                    title={'Edit customerProduct ' + customerProduct.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete customerProduct ' + customerProduct.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(customerProduct.id)}
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

export default CustomerProductsList;
