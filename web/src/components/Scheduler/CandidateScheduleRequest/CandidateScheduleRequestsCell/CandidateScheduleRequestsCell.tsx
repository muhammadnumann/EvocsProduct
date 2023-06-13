import type { FindCandidateScheduleRequests } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import CandidateScheduleRequests from 'src/components/Scheduler/CandidateScheduleRequest/CandidateScheduleRequests';

export const QUERY = gql`
  query FindCandidateScheduleRequests {
    candidateScheduleRequests {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No candidateScheduleRequests yet. '}
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
  candidateScheduleRequests,
}: CellSuccessProps<FindCandidateScheduleRequests>) => {
  return (
    <CandidateScheduleRequests
      candidateScheduleRequests={candidateScheduleRequests}
    />
  );
};
