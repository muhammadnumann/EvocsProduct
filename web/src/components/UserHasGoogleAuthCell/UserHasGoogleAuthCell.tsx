import type {
  FindUserHasGoogleAuthQuery,
  FindUserHasGoogleAuthQueryVariables,
  UserProduct,
} from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import GoogleLoginButton from '../GoogleLoginButton/GoogleLoginButton';

export const QUERY = gql`
  query FindUserHasGoogleAuthQuery($args: UserProduct!) {
    userHasGoogleAuth(args: $args)
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps<UserProduct>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
);

type SuccessProps = CellSuccessProps<
  FindUserHasGoogleAuthQuery,
  FindUserHasGoogleAuthQueryVariables
> &
  FindUserHasGoogleAuthQueryVariables & { scopes: string };
export const Success = ({
  userHasGoogleAuth,
  args: { userID, productID },
  scopes,
}: SuccessProps) => {
  return (
    <GoogleLoginButton
      alreadyAuthed={userHasGoogleAuth}
      userID={userID}
      productID={productID}
      scopes={scopes}
    />
  );
};
