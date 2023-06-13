import type { FindCandidateSchedules } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import CandidateSchedules from 'src/components/Scheduler/Candidates/CandidateSchedule/CandidateSchedules';

export const QUERY = gql`
  query FindCandidateSchedules($candidateRequisitionID: Int!) {
    candidateRequisitionSchedules(
      candidateRequisitionID: $candidateRequisitionID
    ) {
      id
      candidateRequisitionID
      createdAt
      updatedAt
      Candidate {
        id
        name
        email
      }
      Requsition {
        id
        title
        status
        createdAt
        updatedAt
      }
      scheduleSelections {
        id
        startTime
        endTime
      }
      scheduleRequests {
        id
        initiatingUser {
          id
          email
        }
        linkClickedAt
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No candidateSchedules yet. '}
      <Link
        to={routes.schedulerNewCandidateScheduleRequest()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  candidateRequisitionSchedules,
}: CellSuccessProps<FindCandidateSchedules>) => {
  return (
    <CandidateSchedules
      candidateRequisitionSchedules={candidateRequisitionSchedules}
    />
  );
};
