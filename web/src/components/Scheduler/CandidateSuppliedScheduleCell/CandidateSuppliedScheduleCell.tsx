import type {
  FindCandidateSuppliedScheduleQuery,
  FindCandidateSuppliedScheduleQueryVariables,
} from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import PublicCandidateSchedule from 'src/components/PublicCandidateSchedule/PublicCandidateSchedule';

export const QUERY = gql`
  query FindCandidateSuppliedScheduleQuery($linkID: String!) {
    candidateSuppliedSchedule: publicCandidateSchedule(linkID: $linkID) {
      firstName
      lastName
      title
      status
      positionType
      startTime
      endTime
      scheduleSelections {
        id
        startTime
        endTime
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindCandidateSuppliedScheduleQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
);

export const Success = ({
  variables: { linkID },
  candidateSuppliedSchedule,
}: CellSuccessProps<
  FindCandidateSuppliedScheduleQuery,
  FindCandidateSuppliedScheduleQueryVariables
>) => {
  return (
    <PublicCandidateSchedule {...candidateSuppliedSchedule} linkID={linkID} />
  );
};
