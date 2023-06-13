import type { FindCandidateSchedules } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';

import { timeTag, truncate } from 'src/lib/formatters';

const CandidateSchedulesList = ({
  candidateRequisitionSchedules,
}: FindCandidateSchedules) => {
  const onDeleteClick = (id: number) => {
    if (
      confirm('Are you sure you want to delete candidateSchedule ' + id + '?')
    ) {
      // todo handle delete invalidating all currently set candidate schedules
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Candidate id</th>
            <th>Requisition id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {candidateRequisitionSchedules.map((candidateSchedule) => (
            <tr key={candidateSchedule.id}>
              <td>{truncate(candidateSchedule.id)}</td>
              <td>{truncate(candidateSchedule.Candidate.id)}</td>
              <td>{truncate(candidateSchedule.Requsition.id)}</td>
              <td>{timeTag(candidateSchedule.createdAt)}</td>
              <td>{timeTag(candidateSchedule.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.schedulerCandidatesCandidateSchedule({
                      id: candidateSchedule.id,
                    })}
                    title={
                      'Show candidateSchedule ' +
                      candidateSchedule.id +
                      ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.schedulerCandidatesEditCandidateSchedule({
                      id: candidateSchedule.id,
                    })}
                    title={'Edit candidateSchedule ' + candidateSchedule.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete candidateSchedule ' + candidateSchedule.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(candidateSchedule.id)}
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

export default CandidateSchedulesList;
