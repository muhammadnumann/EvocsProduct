import type {
  DeleteConfiguredOAuthMutationVariables,
  FindConfiguredOAuthById,
} from 'types/graphql';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { formatEnum, timeTag } from 'src/lib/formatters';

const DELETE_CONFIGURED_O_AUTH_MUTATION = gql`
  mutation DeleteConfiguredOAuthMutation($id: Int!) {
    deleteConfiguredOAuth(id: $id) {
      id
    }
  }
`;

interface Props {
  configuredOAuth: NonNullable<FindConfiguredOAuthById['configuredOAuth']>;
}

const ConfiguredOAuth = ({ configuredOAuth }: Props) => {
  const [deleteConfiguredOAuth] = useMutation(
    DELETE_CONFIGURED_O_AUTH_MUTATION,
    {
      onCompleted: () => {
        toast.success('ConfiguredOAuth deleted');
        navigate(routes.configuredOAuths());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onDeleteClick = (id: DeleteConfiguredOAuthMutationVariables['id']) => {
    if (
      confirm('Are you sure you want to delete configuredOAuth ' + id + '?')
    ) {
      deleteConfiguredOAuth({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ConfiguredOAuth {configuredOAuth.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{configuredOAuth.id}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{configuredOAuth.userID}</td>
            </tr>
            <tr>
              <th>Customer product id</th>
              <td>{configuredOAuth.customerProductID}</td>
            </tr>
            <tr>
              <th>Access token</th>
              <td>{configuredOAuth.accessToken}</td>
            </tr>
            <tr>
              <th>Refresh token</th>
              <td>{configuredOAuth.refreshToken}</td>
            </tr>
            <tr>
              <th>Expiry date</th>
              <td>{timeTag(configuredOAuth.expiryDate)}</td>
            </tr>
            <tr>
              <th>Provider</th>
              <td>{formatEnum(configuredOAuth.provider)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(configuredOAuth.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(configuredOAuth.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editConfiguredOAuth({ id: configuredOAuth.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(configuredOAuth.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default ConfiguredOAuth;
