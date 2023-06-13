import { Bars3Icon } from '@heroicons/react/24/outline';
import type {
  DeleteCandidateMutationVariables,
  FindCandidates,
} from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ListView from 'src/components/ListView/ListView';
import { QUERY } from 'src/components/Scheduler/Candidate/CandidatesCell';
import { timeTag, truncate } from 'src/lib/formatters';

const DELETE_CANDIDATE_MUTATION = gql`
  mutation DeleteCandidateMutation($id: Int!) {
    deleteCandidate(id: $id) {
      id
    }
  }
`;

const CandidatesList = ({ candidates }: FindCandidates) => {
  const [deleteCandidate] = useMutation(DELETE_CANDIDATE_MUTATION, {
    onCompleted: () => {
      toast.success('Candidate deleted');
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

  const onDeleteClick = (id: DeleteCandidateMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete candidate ' + id + '?')) {
      deleteCandidate({ variables: { id } });
    }
  };

  return (
    <div>
      <div className="rw-segment rw-table-wrapper-responsive">
        <table className="rw-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Owning customer id</th>
              <th>Added by user id</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Preferred name</th>
              <th>Email</th>
              <th>Home phone</th>
              <th>Mobile phone</th>
              <th>About</th>
              <th>Wd candidate id</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{truncate(candidate.id)}</td>
                <td>{truncate(candidate.owningCustomerID)}</td>
                <td>{truncate(candidate.addedByUserID)}</td>
                <td>{truncate(candidate.firstName)}</td>
                <td>{truncate(candidate.lastName)}</td>
                <td>{truncate(candidate.preferredName)}</td>
                <td>{truncate(candidate.email)}</td>
                <td>{truncate(candidate.homePhone)}</td>
                <td>{truncate(candidate.mobilePhone)}</td>
                <td>{truncate(candidate.about)}</td>
                <td>{truncate(candidate.wdCandidateID)}</td>
                <td>{timeTag(candidate.createdAt)}</td>
                <td>{timeTag(candidate.updatedAt)}</td>
                <td>
                  <nav className="rw-table-actions">
                    <Link
                      to={routes.schedulerCandidate({ id: candidate.id })}
                      title={'Show candidate ' + candidate.id + ' detail'}
                      className="rw-button rw-button-small"
                    >
                      Show
                    </Link>
                    <Link
                      to={routes.schedulerEditCandidate({ id: candidate.id })}
                      title={'Edit candidate ' + candidate.id}
                      className="rw-button rw-button-small rw-button-blue"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      title={'Delete candidate ' + candidate.id}
                      className="rw-button rw-button-small rw-button-red"
                      onClick={() => onDeleteClick(candidate.id)}
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
    </div>
  );
};

export default CandidatesList;
