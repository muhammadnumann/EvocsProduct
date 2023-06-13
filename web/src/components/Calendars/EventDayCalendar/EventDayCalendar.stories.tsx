// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof EventDayCalendar> = (args) => {
//   return <EventDayCalendar {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { getDatesByView } from 'src/utils/utils';

import { CalendarView } from '../Calendar/Calendar';

import EventDayCalendar from './EventDayCalendar';

const defaultDate = new Date();
const defaults = {
  weekDates: getDatesByView(CalendarView.WEEK, defaultDate),
  monthDates: getDatesByView(CalendarView.MONTH, defaultDate),
  selectedDate: defaultDate,
  dateEvents: [],
  hideCalendarMonth: true,
};

export const Template: ComponentStory<typeof EventDayCalendar> = ({
  weekDates,
  monthDates: initialMonthDates,
  dateEvents,
  selectedDate,
  hideMonthCalendar,
}) => {
  return (
    <EventDayCalendar
      weekDates={weekDates}
      monthDates={initialMonthDates}
      dateEvents={dateEvents}
      selectedDate={selectedDate}
      hideMonthCalendar={true}
    />
  );
};

export default {
  title: 'Components/EventDayCalendar',
  component: EventDayCalendar,
} as ComponentMeta<typeof EventDayCalendar>;
