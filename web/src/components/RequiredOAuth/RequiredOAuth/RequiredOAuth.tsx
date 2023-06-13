/* eslint-disable @typescript-eslint/no-unused-vars */
import humanize from 'humanize-string';
import type {
  DeleteRequiredOAuthMutationVariables,
  FindRequiredOAuthById,
} from 'types/graphql';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

const DELETE_REQUIRED_O_AUTH_MUTATION = gql`
  mutation DeleteRequiredOAuthMutation($id: Int!) {
    deleteRequiredOAuth(id: $id) {
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

const jsonDisplay = (obj: unknown) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  );
};

const timeTag = (datetime?: string) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  );
};

const checkboxInputTag = (checked: boolean) => {
  return <input type="checkbox" checked={checked} disabled />;
};

interface Props {
  requiredOAuth: NonNullable<FindRequiredOAuthById['requiredOAuth']>;
}

const RequiredOAuth = ({ requiredOAuth }: Props) => {
  const [deleteRequiredOAuth] = useMutation(DELETE_REQUIRED_O_AUTH_MUTATION, {
    onCompleted: () => {
      toast.success('RequiredOAuth deleted');
      navigate(routes.requiredOAuths());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteRequiredOAuthMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete requiredOAuth ' + id + '?')) {
      deleteRequiredOAuth({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            RequiredOAuth {requiredOAuth.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{requiredOAuth.id}</td>
            </tr>
            <tr>
              <th>Customer product id</th>
              <td>{requiredOAuth.customerProduct.id}</td>
            </tr>
            <tr>
              <th>Product</th>
              <td>{requiredOAuth.customerProduct.product.title}</td>
            </tr>
            <tr>
              <th>Customer</th>
              <td>{requiredOAuth.customerProduct.customer.name}</td>
            </tr>
            <tr>
              <th>Google</th>
              <td>{checkboxInputTag(requiredOAuth.google)}</td>
            </tr>
            <tr>
              <th>Azure Active Directory</th>
              <td>{checkboxInputTag(requiredOAuth.azureAD)}</td>
            </tr>
            <tr>
              <th>Ad FS</th>
              <td>{checkboxInputTag(requiredOAuth.adFS)}</td>
            </tr>
            <tr>
              <th>Ping Federation</th>
              <td>{checkboxInputTag(requiredOAuth.ping)}</td>
            </tr>
            <tr>
              <th>Active Directory LDAP</th>
              <td>{checkboxInputTag(requiredOAuth.adLDAP)}</td>
            </tr>
            <tr>
              <th>Zoom</th>
              <td>{checkboxInputTag(requiredOAuth.zoom)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editRequiredOAuth({ id: requiredOAuth.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(requiredOAuth.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default RequiredOAuth;
