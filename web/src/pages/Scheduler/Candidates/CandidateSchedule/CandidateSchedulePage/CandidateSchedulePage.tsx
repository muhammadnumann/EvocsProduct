import CandidateScheduleCell from 'src/components/Scheduler/Candidates/CandidateSchedule/CandidateScheduleCell';

type CandidateSchedulePageProps = {
  id: number;
};

const CandidateSchedulePage = ({ id }: CandidateSchedulePageProps) => {
  return <CandidateScheduleCell id={id} />;
};

export default CandidateSchedulePage;
