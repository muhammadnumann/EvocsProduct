// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CalendarHeader> = (args) => {
//   return <CalendarHeader {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import CalendarHeader from './CalendarHeader';

export const generated = () => {
  return <CalendarHeader />;
};

export default {
  title: 'Components/CalendarHeader',
  component: CalendarHeader,
} as ComponentMeta<typeof CalendarHeader>;
