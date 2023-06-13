import type {
  DeleteConfiguredOAuthMutationVariables,
  FindConfiguredOAuths,
} from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/ConfiguredOAuth/ConfiguredOAuthsCell';
import { formatEnum, timeTag, truncate } from 'src/lib/formatters';

const DELETE_CONFIGURED_O_AUTH_MUTATION = gql`
  mutation DeleteConfiguredOAuthMutation($id: Int!) {
    deleteConfiguredOAuth(id: $id) {
      id
    }
  }
`;

const ConfiguredOAuthsList = ({ configuredOAuths }: FindConfiguredOAuths) => {
  const [deleteConfiguredOAuth] = useMutation(
    DELETE_CONFIGURED_O_AUTH_MUTATION,
    {
      onCompleted: () => {
        toast.success('ConfiguredOAuth deleted');
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

  const onDeleteClick = (id: DeleteConfiguredOAuthMutationVariables['id']) => {
    if (
      confirm('Are you sure you want to delete configuredOAuth ' + id + '?')
    ) {
      deleteConfiguredOAuth({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User id</th>
            <th>Customer product id</th>
            <th>Access token</th>
            <th>Refresh token</th>
            <th>Expiry date</th>
            <th>Provider</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {configuredOAuths.map((configuredOAuth) => (
            <tr key={configuredOAuth.id}>
              <td>{truncate(configuredOAuth.id)}</td>
              <td>{truncate(configuredOAuth.userID)}</td>
              <td>{truncate(configuredOAuth.customerProductID)}</td>
              <td>{truncate(configuredOAuth.accessToken)}</td>
              <td>{truncate(configuredOAuth.refreshToken)}</td>
              <td>{timeTag(configuredOAuth.expiryDate)}</td>
              <td>{formatEnum(configuredOAuth.provider)}</td>
              <td>{timeTag(configuredOAuth.createdAt)}</td>
              <td>{timeTag(configuredOAuth.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.configuredOAuth({ id: configuredOAuth.id })}
                    title={
                      'Show configuredOAuth ' + configuredOAuth.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editConfiguredOAuth({ id: configuredOAuth.id })}
                    title={'Edit configuredOAuth ' + configuredOAuth.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete configuredOAuth ' + configuredOAuth.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(configuredOAuth.id)}
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

export default ConfiguredOAuthsList;
