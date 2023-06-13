import humanize from 'humanize-string';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

const DELETE_CUSTOMER_PRODUCT_MUTATION = gql`
  mutation DeleteCustomerProductMutation($id: Int!) {
    deleteCustomerProduct(id: $id) {
      id
    }
  }
`;

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

const _jsonDisplay = (obj) => {
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

const _checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />;
};

const CustomerProduct = ({ customerProduct }) => {
  const [deleteCustomerProduct] = useMutation(
    DELETE_CUSTOMER_PRODUCT_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerProduct deleted');
        navigate(routes.customerProducts());
      },
      onError: (error) => {
        toast.error(error.message);
      },
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
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            CustomerProduct {customerProduct.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{customerProduct.id}</td>
            </tr>
            <tr>
              <th>Product id</th>
              <td>{customerProduct.productID}</td>
            </tr>
            <tr>
              <th>Customer id</th>
              <td>{customerProduct.customerID}</td>
            </tr>
            <tr>
              <th>Config</th>
              <td>{JSON.stringify(customerProduct.config)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(customerProduct.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(customerProduct.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCustomerProduct({ id: customerProduct.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(customerProduct.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default CustomerProduct;
