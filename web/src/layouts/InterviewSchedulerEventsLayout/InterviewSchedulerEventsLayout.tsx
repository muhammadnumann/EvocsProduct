import InterviewSchedulerEventsLayoutCell from '../../components/InterviewSchedulerEventsLayoutCell';
import SchedulerLayout from '../SchedulerLayout/SchedulerLayout';

type InterviewSchedulerEventLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const InterviewSchedulerEventsLayout = ({
  title,
  children,
}: InterviewSchedulerEventLayoutProps) => (
  <SchedulerLayout title={title}>
    <InterviewSchedulerEventsLayoutCell>
      {children}
    </InterviewSchedulerEventsLayoutCell>
  </SchedulerLayout>
);

export default InterviewSchedulerEventsLayout;
