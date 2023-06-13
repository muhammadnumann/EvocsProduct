import { Auth0Client, Auth0ClientOptions } from '@auth0/auth0-spa-js';

import { createAuth } from '@redwoodjs/auth-auth0-web';

import { orgIDLocalStorageKey } from './components/OrgIDContext/OrgIDContext';

const auth0 = (): Auth0Client => {
  const opts: Auth0ClientOptions = {
    domain: process.env.AUTH0_DOMAIN,
    redirect_uri: window.location.origin,
    client_id: process.env.AUTH0_CLIENT_ID,

    // ** NOTE ** Storing tokens in browser local storage provides persistence across page refreshes and browser tabs.
    // However, if an attacker can achieve running JavaScript in the SPA using a cross-site scripting (XSS) attack,
    // they can retrieve the tokens stored in local storage.
    // https://auth0.com/docs/libraries/auth0-spa-js#change-storage-options
    cacheLocation: 'localstorage',
    audience: process.env.AUTH0_AUDIENCE,

    // @MARK: useRefreshTokens is required for automatically extending sessions
    // beyond that set in the initial JWT expiration.
    //
    // @MARK: https://auth0.com/docs/tokens/refresh-tokens
    useRefreshTokens: true,
  };
  const org = localStorage.getItem(orgIDLocalStorageKey);
  if (org !== null) {
    opts.organization = org;
  }

  return new Auth0Client(opts);
};

export const { AuthProvider, useAuth } = createAuth(auth0());
