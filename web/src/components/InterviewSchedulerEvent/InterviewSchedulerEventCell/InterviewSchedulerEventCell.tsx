import type { FindInterviewSchedulerEventById } from 'types/graphql';

import { Redirect, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import InterviewSchedulerEvent from 'src/components/InterviewSchedulerEvent/InterviewSchedulerEvent';

export const QUERY = gql`
  query FindInterviewSchedulerEventById($id: Int!) {
    interviewSchedulerEvent: interviewSchedulerEvent(id: $id) {
      id
      userID
      customerID
      attendees {
        id
        eventID
        attendeeURI
        name
        email
        inviteStatus
        avatarURL
      }
      calendarProvider
      conferencingProvider
      title
      description
      startTime
      endTime
      requisitionID
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <Redirect to={routes.interviewSchedulerEvents()} />;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  interviewSchedulerEvent,
}: CellSuccessProps<FindInterviewSchedulerEventById>) => {
  return (
    <InterviewSchedulerEvent
      interviewSchedulerEvent={interviewSchedulerEvent}
    />
  );
};
