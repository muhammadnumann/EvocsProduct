import type { FindCandidateScheduleById } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';

import { timeTag } from 'src/lib/formatters';

interface Props {
  candidateSchedule: NonNullable<
    FindCandidateScheduleById['candidateSchedule']
  >;
}

const CandidateSchedule = ({ candidateSchedule }: Props) => {
  const onDeleteClick = (id: number) => {
    if (
      confirm('Are you sure you want to delete candidateSchedule ' + id + '?')
    ) {
      // todo handle delete invalidating all currently set candidate schedules
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            CandidateSchedule {candidateSchedule.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{candidateSchedule.id}</td>
            </tr>
            <tr>
              <th>Candidate id</th>
              <td>{candidateSchedule.CandidateRequisition.candidateID}</td>
            </tr>
            <tr>
              <th>Requisition id</th>
              <td>{candidateSchedule.CandidateRequisition.requisitionID}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(candidateSchedule.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(candidateSchedule.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.schedulerCandidatesEditCandidateSchedule({
            id: candidateSchedule.id,
          })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(candidateSchedule.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default CandidateSchedule;
