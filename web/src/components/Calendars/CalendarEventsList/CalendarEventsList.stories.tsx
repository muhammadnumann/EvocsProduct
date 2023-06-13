// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CalendarEventsList> = (args) => {
//   return <CalendarEventsList {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import { FC } from 'react';

import type { ComponentMeta } from '@storybook/react';

import { ArrayElement } from 'src/utils/types';

import CalendarEventsList from './CalendarEventsList';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type PropTypes<T extends FC<unknown>> = T extends FC<infer T> ? T : never;

export const empty = () => {
  return <CalendarEventsList events={[]} />;
};

export const oneEvent = () => {
  const event: ArrayElement<PropTypes<typeof CalendarEventsList>['events']> = {
    id: 0,
    userID: 0,
    customerID: 0,
    calendarProvider: 'GOOGLE',
    title: 'Storybook Interview',
    description: '',
    startTime: '2022-11-18 18:29:00-05',
    endTime: '2022-11-18 19:29:00-05',
    createdAt: '',
    updatedAt: '',
    attendees: [],
  };

  return <CalendarEventsList events={[event]} />;
};

export default {
  title: 'Components/CalendarEventsList',
  component: CalendarEventsList,
} as ComponentMeta<typeof CalendarEventsList>;
