import type {
  EditConfiguredOAuthById,
  UpdateConfiguredOAuthInput,
} from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ConfiguredOAuthForm from 'src/components/ConfiguredOAuth/ConfiguredOAuthForm';

export const QUERY = gql`
  query EditConfiguredOAuthById($id: Int!) {
    configuredOAuth: configuredOAuth(id: $id) {
      id
      userID
      customerProductID
      accessToken
      refreshToken
      expiryDate
      provider
      createdAt
      updatedAt
    }
  }
`;
const UPDATE_CONFIGURED_O_AUTH_MUTATION = gql`
  mutation UpdateConfiguredOAuthMutation(
    $id: Int!
    $input: UpdateConfiguredOAuthInput!
  ) {
    updateConfiguredOAuth(id: $id, input: $input) {
      id
      userID
      customerProductID
      accessToken
      refreshToken
      expiryDate
      provider
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  configuredOAuth,
}: CellSuccessProps<EditConfiguredOAuthById>) => {
  const [updateConfiguredOAuth, { loading, error }] = useMutation(
    UPDATE_CONFIGURED_O_AUTH_MUTATION,
    {
      onCompleted: () => {
        toast.success('ConfiguredOAuth updated');
        navigate(routes.configuredOAuths());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (
    input: UpdateConfiguredOAuthInput,
    id: EditConfiguredOAuthById['configuredOAuth']['id']
  ) => {
    updateConfiguredOAuth({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ConfiguredOAuth {configuredOAuth?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ConfiguredOAuthForm
          configuredOAuth={configuredOAuth}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
