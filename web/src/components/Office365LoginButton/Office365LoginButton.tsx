import { FC, HTMLAttributes, useEffect, useState } from 'react';

import { CreateAzureADAuth, CreateAzureADAuthVariables } from 'types/graphql';

import { useMutation } from '@redwoodjs/web';

import { useAuth } from 'src/auth';

const CREATE_AZURE_AD_AUTH = gql`
  mutation CreateAzureADAuth($input: CreateConfiguredOAuthInput!) {
    createConfiguredOAuth(input: $input) {
      id
      createdAt
      updatedAt
    }
  }
`;

type Office365LoginButtonProps = {
  alreadyAuthed: boolean;
  userID: number;
  productID: number;
  successRefetchQueryName?: string;
} & HTMLAttributes<HTMLButtonElement>;
const Office365LoginButton: FC<Office365LoginButtonProps> = ({
  alreadyAuthed,
  userID,
  productID,
  className,
  children,
  successRefetchQueryName,
}) => {
  const { getToken } = useAuth();

  const [externalPopup, setExternalPopup] = useState<Window>(null);
  const [loginEnabled, setLoginEnabled] = useState(!alreadyAuthed);
  const [code, setCode] = useState<string | null>(null);
  const [create, { error }] = useMutation<
    CreateAzureADAuth,
    CreateAzureADAuthVariables
  >(CREATE_AZURE_AD_AUTH, {
    refetchQueries: [successRefetchQueryName],
  });
  if (error) {
    console.error(error);
  }

  // https://elvisciotti.medium.com/how-to-create-a-oauth-popup-in-react-7ab102ea48f
  const login = async (_: React.MouseEvent<HTMLButtonElement>) => {
    const width = 600;
    const height = 579;
    const left = window.screenX + (window.outerWidth - width - 25);
    const top = window.screenY + height / 1.5;

    const token = await getToken();

    const title = 'Authenticate with Azure AD';
    const url = `${global.RWJS_API_URL}/schedulerObtainAzureADTokens?token=${token}`;
    const popup = window.open(
      url,
      title,
      `width=${width},height=${height},left=${left},top=${top}`
    );
    setExternalPopup(popup);
  };

  useEffect(() => {
    if (!externalPopup) {
      return;
    }

    const timer = setInterval(() => {
      if (!externalPopup) {
        timer && clearInterval(timer);
        return;
      }

      let currentURL: string;
      try {
        currentURL = externalPopup.location.href;
        if (!currentURL) {
          return;
        }
      } catch (e) {
        return;
      }

      const searchParams = new URL(currentURL).searchParams;
      const oauth2Code = searchParams.get('code');
      if (oauth2Code) {
        externalPopup.close();
        setCode(oauth2Code);
        setExternalPopup(null);
        timer && clearInterval(timer);
      }
    }, 500);
  }, [externalPopup]);

  useEffect(() => {
    const onSuccess = async () => {
      await create({
        variables: {
          input: {
            userID,
            productID,
            oneTimeAuthToken: code,
            provider: 'AZURE_AD',
          },
        },
      });
      setLoginEnabled(false);
    };

    if (code) {
      onSuccess();
    }
  }, [code, create, productID, userID]);

  return (
    <button className={className} onClick={login} disabled={!loginEnabled}>
      {children}
    </button>
  );
};

export default Office365LoginButton;
