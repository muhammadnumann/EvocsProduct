import { FC } from 'react';

import NewCandidateScheduleRequestCell from 'src/components/Scheduler/CandidateScheduleRequest/NewCandidateScheduleRequestCell';

type Props = {
  candidateRequisitionID: number;
  candidateScheduleID: number;
};
const NewCandidateScheduleRequestPage: FC<Props> = ({
  candidateRequisitionID,
  candidateScheduleID,
}) => {
  return (
    <NewCandidateScheduleRequestCell
      candidateRequisitionID={candidateRequisitionID}
      candidateScheduleID={candidateScheduleID}
    />
  );
};

export default NewCandidateScheduleRequestPage;
