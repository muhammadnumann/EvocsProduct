import type { FindCandidateById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Candidate from 'src/components/Scheduler/Candidate/Candidate';

export const QUERY = gql`
  query FindCandidateById($id: Int!) {
    candidate: candidate(id: $id) {
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

      requsitions {
        id
        title
        status
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Candidate not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ candidate }: CellSuccessProps<FindCandidateById>) => {
  return <Candidate candidate={candidate} />;
};
