import type { FindCandidateScheduleRequestById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import CandidateScheduleRequest from 'src/components/Scheduler/CandidateScheduleRequest/CandidateScheduleRequest';

export const QUERY = gql`
  query FindCandidateScheduleRequestById($id: Int!) {
    candidateScheduleRequest: candidateScheduleRequest(id: $id) {
      id
      candidateID
      initiatingUserID
      candidateScheduleID
      emailSentFromName
      emailSentFromAddressAlias
      emailSubject
      emailBody
      emailServiceMessageID
      linkClickedAt
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>CandidateScheduleRequest not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  candidateScheduleRequest,
}: CellSuccessProps<FindCandidateScheduleRequestById>) => {
  return (
    <CandidateScheduleRequest
      candidateScheduleRequest={candidateScheduleRequest}
    />
  );
};
