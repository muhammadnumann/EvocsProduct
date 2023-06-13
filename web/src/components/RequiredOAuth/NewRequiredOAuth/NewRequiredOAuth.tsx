import type { CreateRequiredOAuthInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import RequiredOAuthForm from 'src/components/RequiredOAuth/RequiredOAuthForm';

const CREATE_REQUIRED_O_AUTH_MUTATION = gql`
  mutation CreateRequiredOAuthMutation($input: CreateRequiredOAuthInput!) {
    createRequiredOAuth(input: $input) {
      id
    }
  }
`;

const NewRequiredOAuth = () => {
  const [createRequiredOAuth, { loading, error }] = useMutation(
    CREATE_REQUIRED_O_AUTH_MUTATION,
    {
      onCompleted: () => {
        toast.success('RequiredOAuth created');
        navigate(routes.requiredOAuths());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input: CreateRequiredOAuthInput) => {
    createRequiredOAuth({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New RequiredOAuth</h2>
      </header>
      <div className="rw-segment-main">
        <RequiredOAuthForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewRequiredOAuth;
