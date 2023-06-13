import { FC } from 'react';

import { ValidateAccessAndGetRequiredAuth } from 'types/graphql';

import { Redirect, routes } from '@redwoodjs/router';

import { useAuth } from 'src/auth';

import UserHasGoogleAuthCell from '../UserHasGoogleAuthCell';

type LinkAccountPageProps = {
  enabledAuthStrategies: ValidateAccessAndGetRequiredAuth['requiredOAuthForProduct'];
  userID: number;
  productID: number;
  scopes: string;
};

const LinkAccountPage: FC<LinkAccountPageProps> = ({
  enabledAuthStrategies,
  userID,
  productID,
  scopes,
}) => {
  const { isAuthenticated } = useAuth();
  const { google } = enabledAuthStrategies;

  return !isAuthenticated ? (
    <Redirect to={routes.home()} />
  ) : (
    <div>
      <h2>{'LinkAccountButton'}</h2>
      {google && (
        <UserHasGoogleAuthCell args={{ userID, productID }} scopes={scopes} />
      )}
    </div>
  );
};

export default LinkAccountPage;
