// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof MonthCalendar> = (args) => {
//   return <MonthCalendar {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import InterviewSchedulerEventsPage from './InterviewSchedulerEventsPage';

export const generated = () => {
  return <InterviewSchedulerEventsPage />;
};

export default {
  title: 'Pages/InterviewSchedulerEventsPage',
  component: InterviewSchedulerEventsPage,
} as ComponentMeta<typeof InterviewSchedulerEventsPage>;
