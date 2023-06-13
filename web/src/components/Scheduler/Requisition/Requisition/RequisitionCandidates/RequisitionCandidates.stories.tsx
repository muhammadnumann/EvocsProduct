// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof RequisitionCandidates> = (args) => {
//   return <RequisitionCandidates {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import RequisitionCandidates from './RequisitionCandidates';

export const generated = () => {
  return <RequisitionCandidates />;
};

export default {
  title: 'Components/RequisitionCandidates',
  component: RequisitionCandidates,
} as ComponentMeta<typeof RequisitionCandidates>;
