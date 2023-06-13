import type { CreateRequisitionInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import RequisitionForm from 'src/components/Scheduler/Requisition/RequisitionForm';

const CREATE_REQUISITION_MUTATION = gql`
  mutation CreateRequisitionMutation($input: CreateRequisitionInput!) {
    createRequisition(input: $input) {
      id
    }
  }
`;

const NewRequisition = () => {
  const [createRequisition, { loading, error }] = useMutation(
    CREATE_REQUISITION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Requisition created');
        navigate(routes.schedulerRequisitions());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input: CreateRequisitionInput) => {
    createRequisition({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Requisition</h2>
      </header>
      <div className="rw-segment-main">
        <RequisitionForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewRequisition;
