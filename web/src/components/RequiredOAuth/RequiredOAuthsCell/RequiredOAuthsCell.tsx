import type { FindRequiredOAuths } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import RequiredOAuths from 'src/components/RequiredOAuth/RequiredOAuths';

export const QUERY = gql`
  query FindRequiredOAuths {
    requiredOAuths {
      id
      customerProductID
      google
      azureAD
      adFS
      ping
      adLDAP
      zoom
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No requiredOAuths yet. '}
      <Link to={routes.newRequiredOAuth()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  requiredOAuths,
}: CellSuccessProps<FindRequiredOAuths>) => {
  return <RequiredOAuths requiredOAuths={requiredOAuths} />;
};
