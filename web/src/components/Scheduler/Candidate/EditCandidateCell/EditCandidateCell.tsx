import type { EditCandidateById, UpdateCandidateInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import CandidateForm from 'src/components/Scheduler/Candidate/CandidateForm';

export const QUERY = gql`
  query EditCandidateById($id: Int!) {
    candidate: candidate(id: $id) {
      id
      owningCustomerID
      addedByUserID
      firstName
      lastName
      preferredName
      email
      homePhone
      mobilePhone
      about
      wdCandidateID
      createdAt
      updatedAt
    }
  }
`;
const UPDATE_CANDIDATE_MUTATION = gql`
  mutation UpdateCandidateMutation($id: Int!, $input: UpdateCandidateInput!) {
    updateCandidate(id: $id, input: $input) {
      id
      owningCustomerID
      addedByUserID
      firstName
      lastName
      preferredName
      email
      homePhone
      mobilePhone
      about
      wdCandidateID
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ candidate }: CellSuccessProps<EditCandidateById>) => {
  const [updateCandidate, { loading, error }] = useMutation(
    UPDATE_CANDIDATE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Candidate updated');
        navigate(routes.schedulerCandidates());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (
    input: UpdateCandidateInput,
    id: EditCandidateById['candidate']['id']
  ) => {
    updateCandidate({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Candidate {candidate?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CandidateForm
          candidate={candidate}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
