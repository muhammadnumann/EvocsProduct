/* eslint-disable @typescript-eslint/no-unused-vars */
import humanize from 'humanize-string';
import type {
  DeleteRequiredOAuthMutationVariables,
  FindRequiredOAuths,
} from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/RequiredOAuth/RequiredOAuthsCell';

const DELETE_REQUIRED_O_AUTH_MUTATION = gql`
  mutation DeleteRequiredOAuthMutation($id: Int!) {
    deleteRequiredOAuth(id: $id) {
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

const truncate = (value: string | number) => {
  const output = value?.toString();
  if (output?.length > MAX_STRING_LENGTH) {
    return output.substring(0, MAX_STRING_LENGTH) + '...';
  }
  return output ?? '';
};

const jsonTruncate = (obj: unknown) => {
  return truncate(JSON.stringify(obj, null, 2));
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

const RequiredOAuthsList = ({ requiredOAuths }: FindRequiredOAuths) => {
  const [deleteRequiredOAuth] = useMutation(DELETE_REQUIRED_O_AUTH_MUTATION, {
    onCompleted: () => {
      toast.success('RequiredOAuth deleted');
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

  const onDeleteClick = (id: DeleteRequiredOAuthMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete requiredOAuth ' + id + '?')) {
      deleteRequiredOAuth({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Customer product id</th>
            <th>Google</th>
            <th>Azure ad</th>
            <th>Ad fs</th>
            <th>Ping</th>
            <th>Ad ldap</th>
            <th>Zoom</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {requiredOAuths.map((requiredOAuth) => (
            <tr key={requiredOAuth.id}>
              <td>{truncate(requiredOAuth.id)}</td>
              <td>{truncate(requiredOAuth.customerProductID)}</td>
              <td>{checkboxInputTag(requiredOAuth.google)}</td>
              <td>{checkboxInputTag(requiredOAuth.azureAD)}</td>
              <td>{checkboxInputTag(requiredOAuth.adFS)}</td>
              <td>{checkboxInputTag(requiredOAuth.ping)}</td>
              <td>{checkboxInputTag(requiredOAuth.adLDAP)}</td>
              <td>{checkboxInputTag(requiredOAuth.zoom)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.requiredOAuth({ id: requiredOAuth.id })}
                    title={'Show requiredOAuth ' + requiredOAuth.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editRequiredOAuth({ id: requiredOAuth.id })}
                    title={'Edit requiredOAuth ' + requiredOAuth.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete requiredOAuth ' + requiredOAuth.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(requiredOAuth.id)}
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

export default RequiredOAuthsList;
