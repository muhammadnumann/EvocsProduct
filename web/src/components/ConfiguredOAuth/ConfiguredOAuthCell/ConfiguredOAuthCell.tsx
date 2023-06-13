import type { FindConfiguredOAuthById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import ConfiguredOAuth from 'src/components/ConfiguredOAuth/ConfiguredOAuth';

export const QUERY = gql`
  query FindConfiguredOAuthById($id: Int!) {
    configuredOAuth: configuredOAuth(id: $id) {
      id
      userID
      customerProductID
      accessToken
      refreshToken
      expiryDate
      provider
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>ConfiguredOAuth not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  configuredOAuth,
}: CellSuccessProps<FindConfiguredOAuthById>) => {
  return <ConfiguredOAuth configuredOAuth={configuredOAuth} />;
};
