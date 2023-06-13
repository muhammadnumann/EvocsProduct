import CandidateCell from 'src/components/Scheduler/Candidate/CandidateCell';

type CandidatePageProps = {
  id: number;
};

const CandidatePage = ({ id }: CandidatePageProps) => {
  return <CandidateCell id={id} />;
};

export default CandidatePage;
