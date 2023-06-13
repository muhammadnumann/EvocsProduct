import { createContext, useContext } from 'react';
import { ReactChild } from 'react';
import { FC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { APIService } from '@buf/bufbuild_connect-web_evocs_commonschema/api/v1/defs_connectweb';
import {
  createConnectTransport,
  createPromiseClient,
  Interceptor,
  PromiseClient,
} from '@bufbuild/connect-web';

import { useAuth } from 'src/auth';

const authInterceptor =
  (authToken: string): Interceptor =>
  (next) =>
  async (req) => {
    req.header.set('authorization', `Bearer ${authToken}`);

    return next(req);
  };

const createClient = (authToken: string): PromiseClient<typeof APIService> => {
  const transport = createConnectTransport({
    baseUrl: process.env.PRODUCT_RUNNER_API_URL,
    interceptors: [authInterceptor(authToken)],
  });

  return createPromiseClient(APIService, transport);
};

export const useProductRunnerClient = (): PromiseClient<typeof APIService> => {
  return useContext(ProductRunnerContext);
};

const ProductRunnerContext = createContext<PromiseClient<typeof APIService>>(
  {} as PromiseClient<typeof APIService>
);

type ProviderProps = {
  children?: ReactChild;
};
export const ProductRunnerClientProvider: FC<ProviderProps> = ({
  children,
}) => {
  const { getToken, isAuthenticated } = useAuth();
  const [authToken, setAuthToken] = useState<string>();
  const [client, setClient] = useState<PromiseClient<typeof APIService>>();

  useEffect(() => {
    const retrieveToken = async () => {
      const token = await getToken();
      setAuthToken(token);
    };

    if (isAuthenticated) {
      retrieveToken();
    }
  }, [getToken, isAuthenticated]);

  useEffect(() => {
    if (authToken) {
      const productRunnerClient = createClient(authToken);
      setClient(productRunnerClient);
    }
  }, [authToken]);

  return (
    <ProductRunnerContext.Provider value={client}>
      {children}
    </ProductRunnerContext.Provider>
  );
};
