import { FC } from 'react';

import type {
  FindCalendarEventsListQuery,
  FindCalendarEventsListQueryVariables,
} from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import { Event } from 'src/utils/interviewscheduler/types';

import CalendarEventsList from '../CalendarEventsList';

type ExtraProps = { knownEvents: Event[] };

export const QUERY = gql`
  query FindCalendarEventsListQuery {
    interviewSchedulerEvents(filter: { limit: 10 }) {
      id
      title
      description
      startTime
      endTime
      candidateID
    }
  }
`;

export const Loading: FC<ExtraProps> = ({ knownEvents }) => (
  <CalendarEventsList events={knownEvents} />
);

export const Failure = ({
  error,
}: CellFailureProps<FindCalendarEventsListQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
);

export const Success = ({
  interviewSchedulerEvents,
}: CellSuccessProps<
  FindCalendarEventsListQuery,
  FindCalendarEventsListQueryVariables
> &
  ExtraProps) => {
  return <CalendarEventsList events={interviewSchedulerEvents} />;
};
