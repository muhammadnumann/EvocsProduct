import type { CreateInterviewSchedulerEventInput } from 'types/graphql';

import { back } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import InterviewSchedulerEventForm from 'src/components/InterviewSchedulerEvent/InterviewSchedulerEventForm';

const CREATE_INTERVIEW_SCHEDULER_EVENT_MUTATION = gql`
  mutation CreateInterviewSchedulerEventMutation(
    $input: CreateInterviewSchedulerEventInput!
  ) {
    createInterviewSchedulerEvent(input: $input) {
      id
    }
  }
`;

const NewInterviewSchedulerEvent = () => {
  const [createInterviewSchedulerEvent, { loading, error }] = useMutation(
    CREATE_INTERVIEW_SCHEDULER_EVENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('InterviewSchedulerEvent created');
        // navigate(routes.interviewSchedulerEvents());
        back();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input: CreateInterviewSchedulerEventInput) => {
    createInterviewSchedulerEvent({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Interview</h2>
      </header>
      <div className="rw-segment-main">
        <InterviewSchedulerEventForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default NewInterviewSchedulerEvent;
