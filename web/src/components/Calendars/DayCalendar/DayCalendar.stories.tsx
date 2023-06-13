// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof DayCalendar> = (args) => {
//   return <DayCalendar {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import DayCalendar from './DayCalendar';

export const generated = () => {
  return <DayCalendar />;
};

export default {
  title: 'Components/DayCalendar',
  component: DayCalendar,
} as ComponentMeta<typeof DayCalendar>;
