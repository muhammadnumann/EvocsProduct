// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof SchedulerDashboardCandidates> = (args) => {
//   return <SchedulerDashboardCandidates {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import SchedulerDashboardCandidates from './SchedulerDashboardCandidates';

export const generated = () => {
  return <SchedulerDashboardCandidates />;
};

export default {
  title: 'Components/SchedulerDashboardCandidates',
  component: SchedulerDashboardCandidates,
} as ComponentMeta<typeof SchedulerDashboardCandidates>;
