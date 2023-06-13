import CandidateScheduleRequestCell from 'src/components/Scheduler/CandidateScheduleRequest/CandidateScheduleRequestCell';

type CandidateScheduleRequestPageProps = {
  id: number;
};

const CandidateScheduleRequestPage = ({
  id,
}: CandidateScheduleRequestPageProps) => {
  return <CandidateScheduleRequestCell id={id} />;
};

export default CandidateScheduleRequestPage;
