// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof DashboardRequisitionStatusBadge> = (args) => {
//   return <DashboardRequisitionStatusBadge {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import DashboardRequisitionStatusBadge from './DashboardRequisitionStatusBadge';

export const generated = () => {
  return <DashboardRequisitionStatusBadge />;
};

export default {
  title: 'Components/DashboardRequisitionStatusBadge',
  component: DashboardRequisitionStatusBadge,
} as ComponentMeta<typeof DashboardRequisitionStatusBadge>;
