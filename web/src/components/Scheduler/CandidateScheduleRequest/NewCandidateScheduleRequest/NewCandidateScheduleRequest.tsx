import { FC } from 'react';

import type {
  CreateCandidateScheduleRequestInput,
  NewCandidateScheduleRequestQuery,
} from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import CandidateScheduleRequestForm from 'src/components/Scheduler/CandidateScheduleRequest/CandidateScheduleRequestForm';

const CREATE_CANDIDATE_SCHEDULE_REQUEST_MUTATION = gql`
  mutation CreateCandidateScheduleRequestMutation(
    $input: CreateCandidateScheduleRequestInput!
  ) {
    createCandidateScheduleRequest(input: $input) {
      id
    }
  }
`;

export type NewCandidateScheduleRequestOnSave = Omit<
  CreateCandidateScheduleRequestInput,
  'candidateID' | 'candidateScheduleID'
>;

type Props = {
  candidate: NewCandidateScheduleRequestQuery['candidateRequisition']['Candidate'];
  candidateSchedule: NewCandidateScheduleRequestQuery['candidateSchedule'];
};
const NewCandidateScheduleRequest: FC<Props> = ({
  candidate,
  candidateSchedule,
}) => {
  const { id: candidateID } = candidate;
  const { id: candidateScheduleID } = candidateSchedule;

  const [createCandidateScheduleRequest, { loading, error }] = useMutation(
    CREATE_CANDIDATE_SCHEDULE_REQUEST_MUTATION,
    {
      onCompleted: () => {
        toast.success('CandidateScheduleRequest created');
        navigate(routes.schedulerCandidateScheduleRequests());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input: NewCandidateScheduleRequestOnSave) => {
    createCandidateScheduleRequest({
      variables: { ...input, candidateID, candidateScheduleID },
    });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Schedule Candidate Interview
        </h2>
      </header>
      <div className="rw-segment-main">
        <CandidateScheduleRequestForm
          onSave={onSave}
          loading={loading}
          error={error}
          candidate={candidate}
          candidateSchedule={candidateSchedule}
        />
      </div>
    </div>
  );
};

export default NewCandidateScheduleRequest;
