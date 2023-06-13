import type { FindCandidateScheduleById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import CandidateSchedule from 'src/components/Scheduler/Candidates/CandidateSchedule/CandidateSchedule';

export const QUERY = gql`
  query FindCandidateScheduleById($id: Int!) {
    candidateSchedule: candidateSchedule(id: $id) {
      id
      candidateRequisitionID
      createdAt
      updatedAt
      CandidateRequisition {
        candidateID
        requisitionID
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>CandidateSchedule not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  candidateSchedule,
}: CellSuccessProps<FindCandidateScheduleById>) => {
  return <CandidateSchedule candidateSchedule={candidateSchedule} />;
};
