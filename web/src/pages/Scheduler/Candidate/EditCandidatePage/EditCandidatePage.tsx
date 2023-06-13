import EditCandidateCell from 'src/components/Scheduler/Candidate/EditCandidateCell';

type CandidatePageProps = {
  id: number;
};

const EditCandidatePage = ({ id }: CandidatePageProps) => {
  return <EditCandidateCell id={id} />;
};

export default EditCandidatePage;
