import type { CreateCandidateInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import CandidateForm from 'src/components/Scheduler/Candidate/CandidateForm';

const CREATE_CANDIDATE_MUTATION = gql`
  mutation CreateCandidateMutation($input: CreateCandidateInput!) {
    createCandidate(input: $input) {
      id
    }
  }
`;

const NewCandidate = () => {
  const [createCandidate, { loading, error }] = useMutation(
    CREATE_CANDIDATE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Candidate created');
        navigate(routes.schedulerCandidates());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input: CreateCandidateInput) => {
    createCandidate({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Candidate</h2>
      </header>
      <div className="rw-segment-main">
        <CandidateForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewCandidate;
