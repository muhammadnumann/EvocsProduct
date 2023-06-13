import type {
  EditRequisitionById,
  UpdateRequisitionInput,
} from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import RequisitionForm from 'src/components/Scheduler/Requisition/RequisitionForm';

export const QUERY = gql`
  query EditRequisitionById($id: Int!) {
    requisition: requisition(id: $id) {
      id
      owningCustomerID
      owningUserID
      title
      summary
      wdRequisitionID
      status
      createdAt
      updatedAt
    }
  }
`;
const UPDATE_REQUISITION_MUTATION = gql`
  mutation UpdateRequisitionMutation(
    $id: Int!
    $input: UpdateRequisitionInput!
  ) {
    updateRequisition(id: $id, input: $input) {
      id
      owningCustomerID
      owningUserID
      title
      summary
      wdRequisitionID
      status
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
  requisition,
}: CellSuccessProps<EditRequisitionById>) => {
  const [updateRequisition, { loading, error }] = useMutation(
    UPDATE_REQUISITION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Requisition updated');
        navigate(routes.schedulerRequisitions());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (
    input: UpdateRequisitionInput,
    id: EditRequisitionById['requisition']['id']
  ) => {
    updateRequisition({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Requisition {requisition?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <RequisitionForm
          requisition={requisition}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
