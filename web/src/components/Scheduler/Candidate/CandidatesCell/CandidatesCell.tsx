import type { FindCandidates } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Candidates from 'src/components/Scheduler/Candidate/Candidates';

export const QUERY = gql`
  query FindCandidates {
    candidates {
      id
      owningCustomerID
      addedByUserID
      firstName
      lastName
      preferredName
      email
      homePhone
      mobilePhone
      about
      wdCandidateID
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No candidates yet. '}
      <Link to={routes.schedulerNewCandidate()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ candidates }: CellSuccessProps<FindCandidates>) => {
  return <Candidates candidates={candidates} />;
};
