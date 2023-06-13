import type {
  DeleteCandidateScheduleRequestMutationVariables,
  FindCandidateScheduleRequestById,
} from 'types/graphql';

import { routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { timeTag } from 'src/lib/formatters';

const DELETE_CANDIDATE_SCHEDULE_REQUEST_MUTATION = gql`
  mutation DeleteCandidateScheduleRequestMutation($id: Int!) {
    deleteCandidateScheduleRequest(id: $id) {
      id
    }
  }
`;

interface Props {
  candidateScheduleRequest: NonNullable<
    FindCandidateScheduleRequestById['candidateScheduleRequest']
  >;
}

const CandidateScheduleRequest = ({ candidateScheduleRequest }: Props) => {
  const [deleteCandidateScheduleRequest] = useMutation(
    DELETE_CANDIDATE_SCHEDULE_REQUEST_MUTATION,
    {
      onCompleted: () => {
        toast.success('CandidateScheduleRequest deleted');
        navigate(routes.schedulerCandidateScheduleRequests());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onDeleteClick = (
    id: DeleteCandidateScheduleRequestMutationVariables['id']
  ) => {
    if (
      confirm(
        'Are you sure you want to delete candidateScheduleRequest ' + id + '?'
      )
    ) {
      deleteCandidateScheduleRequest({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            CandidateScheduleRequest {candidateScheduleRequest.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{candidateScheduleRequest.id}</td>
            </tr>
            <tr>
              <th>Candidate id</th>
              <td>{candidateScheduleRequest.candidateID}</td>
            </tr>
            <tr>
              <th>Initiating user id</th>
              <td>{candidateScheduleRequest.initiatingUserID}</td>
            </tr>
            <tr>
              <th>Candidate schedule id</th>
              <td>{candidateScheduleRequest.candidateScheduleID}</td>
            </tr>
            <tr>
              <th>Email sent from name</th>
              <td>{candidateScheduleRequest.emailSentFromName}</td>
            </tr>
            <tr>
              <th>Email sent from address alias</th>
              <td>{candidateScheduleRequest.emailSentFromAddressAlias}</td>
            </tr>
            <tr>
              <th>Email subject</th>
              <td>{candidateScheduleRequest.emailSubject}</td>
            </tr>
            <tr>
              <th>Email body</th>
              <td>{candidateScheduleRequest.emailBody}</td>
            </tr>
            <tr>
              <th>Email service message id</th>
              <td>{candidateScheduleRequest.emailServiceMessageID}</td>
            </tr>
            <tr>
              <th>Link clicked at</th>
              <td>{timeTag(candidateScheduleRequest.linkClickedAt)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(candidateScheduleRequest.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(candidateScheduleRequest.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(candidateScheduleRequest.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default CandidateScheduleRequest;
