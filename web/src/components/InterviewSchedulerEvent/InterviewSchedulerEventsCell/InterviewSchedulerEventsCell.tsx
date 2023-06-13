import { FC } from 'react';

import type { FindInterviewSchedulerEvents } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Calendar, {
  CalendarProps,
} from 'src/components/Calendars/Calendar/Calendar';

export const QUERY = gql`
  query FindInterviewSchedulerEvents($filter: InterviewSchedulerEventsFilter!) {
    interviewSchedulerEvents(filter: $filter) {
      id
      userID
      title
      description
      startTime
      endTime
      requisitionID
      candidateID
    }
  }
`;

export const Loading: FC<Omit<CalendarProps, 'events'>> = (props) => {
  return <Calendar {...{ ...props, events: [] }} />;
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Empty: FC<Omit<CalendarProps, 'events'>> = (props) => {
  return <Calendar {...{ ...props, events: [] }} />;
};

export const Success = ({
  interviewSchedulerEvents: events,
  day,
  month,
  year,
  dates,
  view,
}: CellSuccessProps<FindInterviewSchedulerEvents> &
  Omit<CalendarProps, 'events'>) => {
  return <Calendar {...{ events, day, month, year, dates, view }} />;
};
