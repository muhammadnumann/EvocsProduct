import type { CreateConfiguredOAuthInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ConfiguredOAuthForm from 'src/components/ConfiguredOAuth/ConfiguredOAuthForm';

const CREATE_CONFIGURED_O_AUTH_MUTATION = gql`
  mutation CreateConfiguredOAuthMutation($input: CreateConfiguredOAuthInput!) {
    createConfiguredOAuth(input: $input) {
      id
    }
  }
`;

const NewConfiguredOAuth = () => {
  const [createConfiguredOAuth, { loading, error }] = useMutation(
    CREATE_CONFIGURED_O_AUTH_MUTATION,
    {
      onCompleted: () => {
        toast.success('ConfiguredOAuth created');
        navigate(routes.configuredOAuths());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input: CreateConfiguredOAuthInput) => {
    createConfiguredOAuth({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ConfiguredOAuth</h2>
      </header>
      <div className="rw-segment-main">
        <ConfiguredOAuthForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewConfiguredOAuth;
