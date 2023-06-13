// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof WeekCalendar> = (args) => {
//   return <WeekCalendar {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import WeekCalendar from './WeekCalendar';

export const generated = () => {
  return <WeekCalendar />;
};

export default {
  title: 'Components/WeekCalendar',
  component: WeekCalendar,
} as ComponentMeta<typeof WeekCalendar>;
