import { FC, HTMLAttributes, useEffect, useState } from 'react';

import { gapi } from 'gapi-script';
import GoogleLogin, { GoogleLoginProps } from 'react-google-login';
import { CreateGoogleAuth, CreateGoogleAuthVariables } from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

const CREATE_GOOGLE_AUTH = gql`
  mutation CreateGoogleAuth($input: CreateConfiguredOAuthInput!) {
    createConfiguredOAuth(input: $input) {
      id
      createdAt
      updatedAt
    }
  }
`;

type GoogleLoginButtonProps = {
  alreadyAuthed: boolean;
  userID: number;
  productID: number;
  scopes: string;
  successRefetchQueryName?: string;
} & HTMLAttributes<HTMLButtonElement>;
const GoogleLoginButton: FC<GoogleLoginButtonProps> = ({
  alreadyAuthed,
  userID,
  productID,
  scopes,
  className,
  children,
  successRefetchQueryName,
}) => {
  const clientId = process.env.GOOGLE_SCHEDULER_CLIENT_ID;
  const [loginEnabled, setLoginEnabled] = useState(!alreadyAuthed);
  const [create, { loading, error }] = useMutation<
    CreateGoogleAuth,
    CreateGoogleAuthVariables
  >(CREATE_GOOGLE_AUTH, {
    refetchQueries: [successRefetchQueryName],
  });
  if (error) {
    console.error(error);
  }

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId,
        scope: scopes,
      });
    };
    gapi.load('client:auth2', initClient);
  }, [scopes, clientId]);

  const onSuccess: GoogleLoginProps['onSuccess'] = async (res) => {
    await create({
      variables: {
        input: {
          userID,
          productID,
          oneTimeAuthToken: res.code,
          provider: 'GOOGLE_WORKSPACE',
        },
      },
    });
    setLoginEnabled(false);
  };

  const onFailure: GoogleLoginProps['onFailure'] = (res) =>
    console.log('failed: ', res);

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Link Google Account"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
      isSignedIn={false}
      uxMode="redirect"
      responseType="code"
      accessType="offline"
      prompt="consent"
      disabled={!loginEnabled || loading}
      render={(renderProps) => (
        <button
          className={className}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          {children}
        </button>
      )}
    />
  );
};

export default GoogleLoginButton;
