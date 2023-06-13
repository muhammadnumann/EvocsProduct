import type {
  EditInterviewSchedulerEventById,
  UpdateInterviewSchedulerEventInput,
} from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import InterviewSchedulerEventForm from 'src/components/InterviewSchedulerEvent/InterviewSchedulerEventForm';

export const QUERY = gql`
  query EditInterviewSchedulerEventById($id: Int!) {
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
      candidateID
      createdAt
      updatedAt
    }
  }
`;
const UPDATE_INTERVIEW_SCHEDULER_EVENT_MUTATION = gql`
  mutation UpdateInterviewSchedulerEventMutation(
    $id: Int!
    $input: UpdateInterviewSchedulerEventInput!
  ) {
    updateInterviewSchedulerEvent(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  interviewSchedulerEvent,
}: CellSuccessProps<EditInterviewSchedulerEventById>) => {
  const [updateInterviewSchedulerEvent, { loading, error }] = useMutation(
    UPDATE_INTERVIEW_SCHEDULER_EVENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('InterviewSchedulerEvent updated');
        navigate(routes.interviewSchedulerEvents());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (
    input: UpdateInterviewSchedulerEventInput,
    id: EditInterviewSchedulerEventById['interviewSchedulerEvent']['id']
  ) => {
    updateInterviewSchedulerEvent({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit InterviewSchedulerEvent {interviewSchedulerEvent?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <InterviewSchedulerEventForm
          interviewSchedulerEvent={interviewSchedulerEvent}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
