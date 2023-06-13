import type {
  EditRequiredOAuthById,
  UpdateRequiredOAuthInput,
} from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import RequiredOAuthForm from 'src/components/RequiredOAuth/RequiredOAuthForm';

export const QUERY = gql`
  query EditRequiredOAuthById($id: Int!) {
    requiredOAuth: requiredOAuth(id: $id) {
      id
      customerProductID
      google
      azureAD
      adFS
      ping
      adLDAP
      zoom
    }
  }
`;
const UPDATE_REQUIRED_O_AUTH_MUTATION = gql`
  mutation UpdateRequiredOAuthMutation(
    $id: Int!
    $input: UpdateRequiredOAuthInput!
  ) {
    updateRequiredOAuth(id: $id, input: $input) {
      id
      customerProductID
      google
      azureAD
      adFS
      ping
      adLDAP
      zoom
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  requiredOAuth,
}: CellSuccessProps<EditRequiredOAuthById>) => {
  const [updateRequiredOAuth, { loading, error }] = useMutation(
    UPDATE_REQUIRED_O_AUTH_MUTATION,
    {
      onCompleted: () => {
        toast.success('RequiredOAuth updated');
        navigate(routes.requiredOAuths());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (
    input: UpdateRequiredOAuthInput,
    id: EditRequiredOAuthById['requiredOAuth']['id']
  ) => {
    updateRequiredOAuth({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit RequiredOAuth {requiredOAuth?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <RequiredOAuthForm
          requiredOAuth={requiredOAuth}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
