import { FC, useContext } from 'react';
import { useState } from 'react';

import { FindInterviewSchedulerEvents } from 'types/graphql';

import { routes } from '@redwoodjs/router';

import { InterviewSchedulerContext } from 'src/components/InterviewSchedulerEventsLayoutCell';
import {
  ChangeCalFN,
  getDatesByView,
  mergeDatesAndEvents,
} from 'src/utils/utils';

import CalendarEventsListCell from '../CalendarEventsList/CalendarEventsListCell';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import DayCalendar from '../DayCalendar/DayCalendar';
import MonthCalendar from '../MonthCalendar/MonthCalendar';
import WeekCalendar from '../WeekCalendar/WeekCalendar';

export enum CalendarView {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

export type CalendarProps = {
  month: number;
  year: number;
  day: number;
  view: CalendarView;
  events: FindInterviewSchedulerEvents['interviewSchedulerEvents'];
  dates: Date[];
};

const Calendar: FC<CalendarProps> = ({
  day,
  month,
  year,
  view,
  dates,
  events,
}) => {
  const [showUpcomingList, setShowUpcomingList] = useState(false);
  const { allAuthConfigured, productID } = useContext(
    InterviewSchedulerContext
  );
  const selectedDate = new Date(year, month, day);

  const change: ChangeCalFN = (args) => {
    return routes.interviewSchedulerEvents({
      day,
      month: month + 1,
      year,
      view,
      ...args,
    });
  };

  const SelectedView: FC = () => {
    switch (view) {
      case CalendarView.DAY:
        return (
          <DayCalendar
            weekDates={getDatesByView(CalendarView.WEEK, selectedDate)}
            monthDates={getDatesByView(CalendarView.MONTH, selectedDate)}
            dateEvents={mergeDatesAndEvents(dates, events)}
            selectedDate={selectedDate}
          />
        );
      case CalendarView.WEEK:
        return (
          <WeekCalendar
            selectedDate={selectedDate}
            dates={dates}
            events={events}
            dateEvents={mergeDatesAndEvents(dates, events)}
          />
        );
      case CalendarView.MONTH:
        return (
          <MonthCalendar
            selectedDate={selectedDate}
            dateEvents={mergeDatesAndEvents(dates, events)}
            changeFN={change}
          />
        );
    }
  };

  return (
    <div className="md:flex md:h-screen md:flex-col">
      <CalendarHeader
        changeFN={change}
        selectedDate={selectedDate}
        view={view}
        upcomingState={[showUpcomingList, setShowUpcomingList]}
        productID={productID}
        enabled={allAuthConfigured}
      />
      {showUpcomingList && <CalendarEventsListCell knownEvents={events} />}
      <SelectedView />
    </div>
  );
};

export default Calendar;
