import { SchedulerDashboardRequisitionsQuery } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import DashboardRequisitions from '../DashboardRequisitions/DashboardRequisitions';

export const QUERY = gql`
  query SchedulerDashboardRequisitionsQuery {
    requisitions(filter: { limit: 10 }) {
      id
      title
      summary
      wdRequisitionID
      status
      createdAt
      updatedAt
      User {
        id
        email
      }
    }
  }
`;

export const Loading = () => (
  <DashboardRequisitions loading={true} requisitions={[]} />
);

export const Empty = () => (
  <DashboardRequisitions loading={false} requisitions={[]} />
);

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
);

export const Success = ({
  requisitions,
}: CellSuccessProps<SchedulerDashboardRequisitionsQuery>) => {
  return <DashboardRequisitions requisitions={requisitions} />;
};
