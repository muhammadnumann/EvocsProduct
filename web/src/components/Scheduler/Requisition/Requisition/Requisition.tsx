import type {
  DeleteRequisitionMutationVariables,
  FindRequisitionById,
} from 'types/graphql';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { timeTag } from 'src/lib/formatters';

import { RequisitionCandidates } from './RequisitionCandidates/RequisitionCandidates';

const DELETE_REQUISITION_MUTATION = gql`
  mutation DeleteRequisitionMutation($id: Int!) {
    deleteRequisition(id: $id) {
      id
    }
  }
`;

interface Props {
  requisition: NonNullable<FindRequisitionById['requisition']>;
}

const Requisition = ({ requisition }: Props) => {
  const [deleteRequisition] = useMutation(DELETE_REQUISITION_MUTATION, {
    onCompleted: () => {
      toast.success('Requisition deleted');
      navigate(routes.schedulerRequisitions());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteRequisitionMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete requisition ' + id + '?')) {
      deleteRequisition({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Requisition {requisition.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{requisition.id}</td>
            </tr>
            <tr>
              <th>Owning customer id</th>
              <td>{requisition.owningCustomerID}</td>
            </tr>
            <tr>
              <th>Owning user id</th>
              <td>{requisition.owningUserID}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{requisition.title}</td>
            </tr>
            <tr>
              <th>Summary</th>
              <td>{requisition.summary}</td>
            </tr>
            <tr>
              <th>Wd requisition id</th>
              <td>{requisition.wdRequisitionID}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{requisition.status}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(requisition.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(requisition.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <RequisitionCandidates candidates={requisition.CandidateRequisitions} />
      <nav className="rw-button-group">
        <Link
          to={routes.schedulerEditRequisition({ id: requisition.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(requisition.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default Requisition;
