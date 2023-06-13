import InterviewSchedulerEventCell from 'src/components/InterviewSchedulerEvent/InterviewSchedulerEventCell';

type InterviewSchedulerEventPageProps = {
  id: number;
};

const InterviewSchedulerEventPage = ({
  id,
}: InterviewSchedulerEventPageProps) => {
  return <InterviewSchedulerEventCell id={id} />;
};

export default InterviewSchedulerEventPage;
