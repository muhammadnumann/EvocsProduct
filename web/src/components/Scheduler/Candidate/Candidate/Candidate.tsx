import type {
  DeleteCandidateMutationVariables,
  FindCandidateById,
} from 'types/graphql';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { timeTag } from 'src/lib/formatters';

import { CandidateRequisitions } from './CandidateRequisitions/CandidateRequisitions';

const DELETE_CANDIDATE_MUTATION = gql`
  mutation DeleteCandidateMutation($id: Int!) {
    deleteCandidate(id: $id) {
      id
    }
  }
`;

interface Props {
  candidate: NonNullable<FindCandidateById['candidate']>;
}

const Candidate = ({ candidate }: Props) => {
  const [deleteCandidate] = useMutation(DELETE_CANDIDATE_MUTATION, {
    onCompleted: () => {
      toast.success('Candidate deleted');
      navigate(routes.schedulerCandidates());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteCandidateMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete candidate ' + id + '?')) {
      deleteCandidate({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Candidate {candidate.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{candidate.id}</td>
            </tr>
            <tr>
              <th>Owning customer id</th>
              <td>{candidate.owningCustomerID}</td>
            </tr>
            <tr>
              <th>Added by user id</th>
              <td>{candidate.addedByUserID}</td>
            </tr>
            <tr>
              <th>First name</th>
              <td>{candidate.firstName}</td>
            </tr>
            <tr>
              <th>Last name</th>
              <td>{candidate.lastName}</td>
            </tr>
            <tr>
              <th>Preferred name</th>
              <td>{candidate.preferredName}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{candidate.email}</td>
            </tr>
            <tr>
              <th>Home phone</th>
              <td>{candidate.homePhone}</td>
            </tr>
            <tr>
              <th>Mobile phone</th>
              <td>{candidate.mobilePhone}</td>
            </tr>
            <tr>
              <th>Notes</th>
              <td>{candidate.about}</td>
            </tr>
            <tr>
              <th>Wd candidate id</th>
              <td>{candidate.wdCandidateID}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(candidate.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(candidate.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <CandidateRequisitions requisitions={candidate.requsitions} />
      <nav className="rw-button-group">
        <Link
          to={routes.schedulerEditCandidate({ id: candidate.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(candidate.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default Candidate;
