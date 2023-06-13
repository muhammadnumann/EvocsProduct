import EditInterviewSchedulerEventCell from 'src/components/InterviewSchedulerEvent/EditInterviewSchedulerEventCell';

type InterviewSchedulerEventPageProps = {
  id: number;
};

const EditInterviewSchedulerEventPage = ({
  id,
}: InterviewSchedulerEventPageProps) => {
  return <EditInterviewSchedulerEventCell id={id} />;
};

export default EditInterviewSchedulerEventPage;
