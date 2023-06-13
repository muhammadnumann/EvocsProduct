import type { FindConfiguredOAuths } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import ConfiguredOAuths from 'src/components/ConfiguredOAuth/ConfiguredOAuths';

export const QUERY = gql`
  query FindConfiguredOAuths {
    configuredOAuths {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No configuredOAuths yet. '}
      <Link to={routes.newConfiguredOAuth()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  configuredOAuths,
}: CellSuccessProps<FindConfiguredOAuths>) => {
  return <ConfiguredOAuths configuredOAuths={configuredOAuths} />;
};
