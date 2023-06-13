import { FC } from 'react';

import CandidateSuppliedScheduleCell from 'src/components/Scheduler/CandidateSuppliedScheduleCell';

const CandidateSuppliedSchedulePage: FC<{ linkID: string }> = ({ linkID }) => {
  return (
    <>
      <CandidateSuppliedScheduleCell linkID={linkID} />
    </>
  );
};

export default CandidateSuppliedSchedulePage;
