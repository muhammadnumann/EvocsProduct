import type {
  NewCandidateScheduleRequestQuery,
  NewCandidateScheduleRequestQueryVariables,
} from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import NewCandidateScheduleRequest from '../NewCandidateScheduleRequest/NewCandidateScheduleRequest';

export const QUERY = gql`
  query NewCandidateScheduleRequestQuery(
    $candidateRequisitionID: Int!
    $candidateScheduleID: Int!
  ) {
    candidateRequisition(id: $candidateRequisitionID) {
      id
      Candidate {
        id
        name
        email
      }
      Requisition {
        id
        title
        status
        summary
      }
    }
    candidateSchedule(id: $candidateScheduleID) {
      id
      candidateRequisitionID
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({
  error,
}: CellFailureProps<NewCandidateScheduleRequestQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
);

export const Success = ({
  candidateRequisition,
  candidateSchedule,
}: CellSuccessProps<
  NewCandidateScheduleRequestQuery,
  NewCandidateScheduleRequestQueryVariables
>) => {
  return (
    <NewCandidateScheduleRequest
      candidate={candidateRequisition.Candidate}
      candidateSchedule={candidateSchedule}
    />
  );
};
