import { FC } from 'react';

import CandidateRequisitionCell from 'src/components/Scheduler/CandidateRequisition/CandidateRequisitionCell';

const CandidateRequisitionPage: FC<{ id: number }> = ({ id }) => {
  return <CandidateRequisitionCell id={id} />;
};

export default CandidateRequisitionPage;
