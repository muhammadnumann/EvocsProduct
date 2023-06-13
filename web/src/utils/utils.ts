import { CalendarView } from 'src/components/Calendars/Calendar/Calendar';

import { DateEventsLike } from './interviewscheduler/types';

export const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(' ');

export const localizeDatetime = (d: Date): Date => {
  return new Date(
    d.toLocaleString('en-US', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
  );
};

export const endOfDay = (d: Date): Date => {
  const date = new Date(d);
  date.setHours(23, 59, 59, 999);

  return date;
};

export const getDatesByView = (v: CalendarView, d: Date): Date[] => {
  switch (v) {
    case CalendarView.DAY:
      return [new Date(d.getFullYear(), d.getMonth(), d.getDate())];
    case CalendarView.WEEK:
      return datesForWeek(d.getDate(), d.getMonth(), d.getFullYear());
    case CalendarView.MONTH:
      return datesForMonth(d.getMonth(), d.getFullYear());
  }
};
export const datesForMonth = (month: number, year: number): Date[] => {
  const SUNDAY = 0;
  const monthCalendarSize = 7 * 6;

  const dates: Date[] = [];
  const date = new Date(year, month, 1);
  // have to check first, subtracting 0 from date coerces to number for some reason
  if (date.getDay() !== SUNDAY) {
    date.setDate(date.getDate() - date.getDay());
  }

  while (dates.length < monthCalendarSize) {
    dates.push(localizeDatetime(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const datesForWeek = (
  day: number,
  month: number,
  year: number
): Date[] => {
  const SUNDAY = 0;
  const WEEK_LENGTH = 7;

  const dates: Date[] = [];
  const date = new Date(year, month, day);
  if (date.getDay() !== SUNDAY) {
    date.setDate(date.getDate() - date.getDay());
  }

  while (dates.length < WEEK_LENGTH) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const getMonthName = (d: Date, short = false): string => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const name = monthNames[d.getMonth()];

  return short ? name.slice(0, 3) : name;
};

export const getDayName = (d: Date, short?: boolean): string => {
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const name = dayNames[d.getDay()];

  return short ? name.slice(0, 3) : name;
};

export const paddedDayDateString = (d: Date): string =>
  d.getDate().toLocaleString('en-us', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

export const paddedDateNumber = (d: Date): string => padNum(d.getDate());

export const htmlTimeTag = (d: Date): string =>
  `${d.getFullYear()}-${paddedDayDateString(d)}`;

export const isCurrentMonth = (d: Date, selectedDate?: Date): boolean =>
  (selectedDate || today()).getMonth() === d.getMonth();

export const isToday = (d: Date): boolean => isSameDate(today(), d);

export const isSameDate = (...dates: Date[]): boolean => {
  if (dates.length < 2) {
    return true;
  }
  const x = dates[0];

  for (let i = 1; i < dates.length; i++) {
    const y = dates[i];
    const same =
      x.getFullYear() === y.getFullYear() &&
      x.getMonth() === y.getMonth() &&
      x.getDate() === y.getDate();
    if (!same) {
      return false;
    }
  }

  return true;
};

export const toDashString = (d: Date): string => d.toISOString().slice(0, 10);

export const toFormattedTimeString = (d: Date): string => {
  return d.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export const dateString = (d: Date): string => {
  return `${getDayName(d, true)}, ${getMonthName(d, true)} ${d.getDate()}`;
};

export type ChangeCalFN = (args: {
  day?: number;
  month?: number;
  year?: number;
  view?: CalendarView;
}) => string;

export const capitalizeFirstLetter = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const mergeDatesAndEvents = <E extends { startTime: string }>(
  dates: Date[],
  events: E[]
): DateEventsLike<E>[] => {
  const dateEvents: DateEventsLike<E>[] = [];
  const eventsByDate: Record<string, E[]> = {};

  for (const e of events) {
    const key = dayKey(new Date(e.startTime));
    if (eventsByDate[key] == null) {
      eventsByDate[key] = [];
    }
    eventsByDate[key].push(e);
  }

  for (const day of dates) {
    const key = dayKey(day);
    const events = eventsByDate[key] ?? [];
    dateEvents.push({
      date: day,
      events,
    });
  }

  return dateEvents;
};

const dayKey = (d: Date): string =>
  `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

export const today = (): Date => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const timeSince = (d: Date): string => {
  const seconds = Math.floor((new Date().getTime() - d.getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
};

const padNum = (n: number): string => (n < 10 ? `0${n}` : `${n}`);
