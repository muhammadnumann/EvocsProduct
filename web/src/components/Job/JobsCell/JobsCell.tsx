import type { FindJobs } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Jobs from 'src/components/Job/Jobs';

export const QUERY = gql`
  query FindJobs {
    jobs {
      id
      status
      initiatingUserID
      productID
      resultBlob
      resultURL
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No jobs yet. '}
      <Link to={routes.newJob()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({ jobs }: CellSuccessProps<FindJobs>) => {
  return <Jobs jobs={jobs} />;
};
