import type {
  DeleteCandidateScheduleRequestMutationVariables,
  FindCandidateScheduleRequests,
} from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/Scheduler/CandidateScheduleRequest/CandidateScheduleRequestsCell';
import { timeTag, truncate } from 'src/lib/formatters';

const DELETE_CANDIDATE_SCHEDULE_REQUEST_MUTATION = gql`
  mutation DeleteCandidateScheduleRequestMutation($id: Int!) {
    deleteCandidateScheduleRequest(id: $id) {
      id
    }
  }
`;

const CandidateScheduleRequestsList = ({
  candidateScheduleRequests,
}: FindCandidateScheduleRequests) => {
  const [deleteCandidateScheduleRequest] = useMutation(
    DELETE_CANDIDATE_SCHEDULE_REQUEST_MUTATION,
    {
      onCompleted: () => {
        toast.success('CandidateScheduleRequest deleted');
      },
      onError: (error) => {
        toast.error(error.message);
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
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
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Candidate id</th>
            <th>Initiating user id</th>
            <th>Candidate schedule id</th>
            <th>Email sent from name</th>
            <th>Email sent from address alias</th>
            <th>Email subject</th>
            <th>Email body</th>
            <th>Email service message id</th>
            <th>Link clicked at</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {candidateScheduleRequests.map((candidateScheduleRequest) => (
            <tr key={candidateScheduleRequest.id}>
              <td>{truncate(candidateScheduleRequest.id)}</td>
              <td>{truncate(candidateScheduleRequest.candidateID)}</td>
              <td>{truncate(candidateScheduleRequest.initiatingUserID)}</td>
              <td>{truncate(candidateScheduleRequest.candidateScheduleID)}</td>
              <td>{truncate(candidateScheduleRequest.emailSentFromName)}</td>
              <td>
                {truncate(candidateScheduleRequest.emailSentFromAddressAlias)}
              </td>
              <td>{truncate(candidateScheduleRequest.emailSubject)}</td>
              <td>{truncate(candidateScheduleRequest.emailBody)}</td>
              <td>
                {truncate(candidateScheduleRequest.emailServiceMessageID)}
              </td>
              <td>{timeTag(candidateScheduleRequest.linkClickedAt)}</td>
              <td>{timeTag(candidateScheduleRequest.createdAt)}</td>
              <td>{timeTag(candidateScheduleRequest.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.schedulerCandidateScheduleRequest({
                      id: candidateScheduleRequest.id,
                    })}
                    title={
                      'Show candidateScheduleRequest ' +
                      candidateScheduleRequest.id +
                      ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <button
                    type="button"
                    title={
                      'Delete candidateScheduleRequest ' +
                      candidateScheduleRequest.id
                    }
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(candidateScheduleRequest.id)}
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
  );
};

export default CandidateScheduleRequestsList;
