import type { SchedulerDashboardCandidatesQuery } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import SchedulerDashboardCandidates from '../SchedulerDashboardCandidates/SchedulerDashboardCandidates';

export const QUERY = gql`
  query SchedulerDashboardCandidatesQuery {
    candidates(filter: { limit: 10 }) {
      id
      name
      email
      wdCandidateID
      createdAt
      updatedAt
      user {
        id
        email
      }
    }
  }
`;

export const Loading = () => (
  <SchedulerDashboardCandidates loading={true} candidates={[]} />
);

export const Empty = () => (
  <SchedulerDashboardCandidates loading={false} candidates={[]} />
);

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
);

export const Success = ({
  candidates,
}: CellSuccessProps<SchedulerDashboardCandidatesQuery>) => {
  return <SchedulerDashboardCandidates candidates={candidates} />;
};
