// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof DashboardRequisitions> = (args) => {
//   return <DashboardRequisitions {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import DashboardRequisitions from './DashboardRequisitions';

export const generated = () => {
  return <DashboardRequisitions />;
};

export default {
  title: 'Components/DashboardRequisitions',
  component: DashboardRequisitions,
} as ComponentMeta<typeof DashboardRequisitions>;
