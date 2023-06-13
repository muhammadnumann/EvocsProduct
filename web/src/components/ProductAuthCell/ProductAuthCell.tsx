import {
  UserProduct,
  ValidateAccessAndGetRequiredAuth,
  ValidateAccessAndGetRequiredAuthVariables,
} from 'types/graphql';

import { Redirect, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import LinkAccountPage from '../LinkAccountPage/LinkAccountPage';

export const QUERY = gql`
  query ValidateAccessAndGetRequiredAuth($args: UserProduct!) {
    userCanConfigureProductAuth(args: $args)
    requiredOAuthForProduct(args: $args) {
      adFS
      adLDAP
      azureAD
      google
      ping
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps<UserProduct>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
);

export const Success = ({
  userCanConfigureProductAuth,
  requiredOAuthForProduct,
  args: { userID, productID },
}: CellSuccessProps<
  ValidateAccessAndGetRequiredAuth,
  ValidateAccessAndGetRequiredAuthVariables
> &
  ValidateAccessAndGetRequiredAuthVariables) => {
  if (!userCanConfigureProductAuth) {
    return <Redirect to={routes.home()} />;
  }
  return (
    <div>
      <LinkAccountPage
        enabledAuthStrategies={requiredOAuthForProduct}
        userID={userID}
        productID={productID}
        scopes="https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/directory.readonly"
      />
    </div>
  );
};
