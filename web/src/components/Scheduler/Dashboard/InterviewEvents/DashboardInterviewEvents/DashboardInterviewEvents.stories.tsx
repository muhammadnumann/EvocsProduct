// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof DashboardInterviewEvents> = (args) => {
//   return <DashboardInterviewEvents {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import DashboardInterviewEvents from './DashboardInterviewEvents';

export const generated = () => {
  return <DashboardInterviewEvents />;
};

export default {
  title: 'Components/DashboardInterviewEvents',
  component: DashboardInterviewEvents,
} as ComponentMeta<typeof DashboardInterviewEvents>;
