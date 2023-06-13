import type { SchedulerDashboardInterviewEventsQuery } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import DashboardInterviewEvents from '../DashboardInterviewEvents/DashboardInterviewEvents';

export const QUERY = gql`
  query SchedulerDashboardInterviewEventsQuery {
    interviewSchedulerEvents(filter: { limit: 10 }) {
      id
      startTime
      endTime
      title
      candidate {
        id
        name
      }
      requisition {
        id
        title
      }
    }
  }
`;

export const Loading = () => (
  <DashboardInterviewEvents loading={true} interviewSchedulerEvents={[]} />
);

export const Empty = () => (
  <DashboardInterviewEvents loading={false} interviewSchedulerEvents={[]} />
);

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
);

export const Success = ({
  interviewSchedulerEvents,
}: CellSuccessProps<SchedulerDashboardInterviewEventsQuery>) => {
  return (
    <DashboardInterviewEvents
      interviewSchedulerEvents={interviewSchedulerEvents}
    />
  );
};
