// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof EventCalendar> = (args) => {
//   return <EventCalendar {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { EventCalendar } from './EventCalendar';

export const Template: ComponentStory<typeof EventCalendar> = ({
  attendees = [],
  date = new Date(),
}) => {
  return <EventCalendar attendees={attendees} date={date} />;
};

export default {
  title: 'Components/EventCalendar',
  component: EventCalendar,
} as ComponentMeta<typeof EventCalendar>;
