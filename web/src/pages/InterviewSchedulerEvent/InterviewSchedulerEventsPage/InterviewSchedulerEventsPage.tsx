import { FC, useEffect, useRef, useState } from 'react';

import { InterviewSchedulerEventsFilter } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';

import { CalendarView } from 'src/components/Calendars/Calendar/Calendar';
import InterviewSchedulerEventsCell from 'src/components/InterviewSchedulerEvent/InterviewSchedulerEventsCell';
import { endOfDay, getDatesByView } from 'src/utils/utils';

type Props = {
  month?: number;
  year?: number;
  day?: number;
  view?: CalendarView;
};
const InterviewSchedulerEventsPage: FC<Props> = ({
  day,
  month,
  year,
  view,
}) => {
  const now = new Date();

  const isFirstRender = useRef(true);

  const [calDay, setCalDay] = useState(day != null ? day : now.getDate());
  const [calMonth, setCalMonth] = useState(
    month != null ? month - 1 : now.getMonth()
  );
  const [calYear, setCalYear] = useState(
    year != null ? year : now.getFullYear()
  );
  const [calView, setCalView] = useState(
    view != null ? view : CalendarView.MONTH
  );
  const [calDate, setCalDate] = useState(new Date(calYear, calMonth, calDay));

  const [calDates, setCalDates] = useState(getDatesByView(calView, calDate));

  useEffect(() => {
    const date = new Date(calYear, calMonth, calDay);
    if (calDate.getTime() !== date.getTime()) {
      setCalDate(new Date(calYear, calMonth, calDay));
    }
  }, [setCalDate, calYear, calMonth, calDay, calDate]);

  useEffect(() => {
    setCalDay(calDate.getDate());
    setCalMonth(calDate.getMonth());
    setCalYear(calDate.getFullYear());
  }, [calDate, setCalDay, setCalMonth, setCalYear]);

  useEffect(() => {
    if (!(day && month && year && view) && calDate && calView) {
      navigate(
        routes.interviewSchedulerEvents({
          day: calDate.getDate(),
          month: calDate.getMonth() + 1,
          year: calDate.getFullYear(),
          view: calView,
        }),
        { replace: true }
      );
    }
  }, [calDate, calView, day, month, view, year]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    day && setCalDay(day);
    month && setCalMonth(month - 1);
    year && setCalYear(year);
    view && setCalView(view);
  }, [day, month, view, year]);

  useEffect(() => {
    setCalDates(getDatesByView(calView, calDate));
  }, [calDate, calView]);

  const filter: InterviewSchedulerEventsFilter = {
    startDate: calDates[0].toISOString(),
    endDate: endOfDay(calDates[calDates.length - 1]).toISOString(),
  };

  return (
    <InterviewSchedulerEventsCell
      filter={filter}
      day={calDay}
      month={calMonth}
      year={calYear}
      dates={calDates}
      view={calView}
    />
  );
};

export default InterviewSchedulerEventsPage;
