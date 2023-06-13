import { Bars3Icon } from '@heroicons/react/24/outline';
import type {
  DeleteRequisitionMutationVariables,
  FindRequisitions,
} from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ListView from 'src/components/ListView/ListView';
import { QUERY } from 'src/components/Scheduler/Requisition/RequisitionsCell';
import { timeTag, truncate } from 'src/lib/formatters';

const DELETE_REQUISITION_MUTATION = gql`
  mutation DeleteRequisitionMutation($id: Int!) {
    deleteRequisition(id: $id) {
      id
    }
  }
`;

const RequisitionsList = ({ requisitions }: FindRequisitions) => {
  const [deleteRequisition] = useMutation(DELETE_REQUISITION_MUTATION, {
    onCompleted: () => {
      toast.success('Requisition deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id: DeleteRequisitionMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete requisition ' + id + '?')) {
      deleteRequisition({ variables: { id } });
    }
  };

  return (
    <div>
      <div className="flex h-screen">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <ListView />
          </div>
        </div>
      </div>
      <div className="rw-segment rw-table-wrapper-responsive">
        <table className="rw-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Owning customer id</th>
              <th>Owning user id</th>
              <th>Title</th>
              <th>Summary</th>
              <th>Wd requisition id</th>
              <th>Status</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {requisitions.map((requisition) => (
              <tr key={requisition.id}>
                <td>{truncate(requisition.id)}</td>
                <td>{truncate(requisition.owningCustomerID)}</td>
                <td>{truncate(requisition.owningUserID)}</td>
                <td>{truncate(requisition.title)}</td>
                <td>{truncate(requisition.summary)}</td>
                <td>{truncate(requisition.wdRequisitionID)}</td>
                <td>{truncate(requisition.status)}</td>
                <td>{timeTag(requisition.createdAt)}</td>
                <td>{timeTag(requisition.updatedAt)}</td>
                <td>
                  <nav className="rw-table-actions">
                    <Link
                      to={routes.schedulerRequisition({ id: requisition.id })}
                      title={'Show requisition ' + requisition.id + ' detail'}
                      className="rw-button rw-button-small"
                    >
                      Show
                    </Link>
                    <Link
                      to={routes.schedulerEditRequisition({
                        id: requisition.id,
                      })}
                      title={'Edit requisition ' + requisition.id}
                      className="rw-button rw-button-small rw-button-blue"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      title={'Delete requisition ' + requisition.id}
                      className="rw-button rw-button-small rw-button-red"
                      onClick={() => onDeleteClick(requisition.id)}
                    >
                      Delete
                    </button>
                  </nav>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequisitionsList;
