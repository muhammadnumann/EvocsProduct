// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CandidateRequisitions> = (args) => {
//   return <CandidateRequisitions {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import CandidateRequisitions from './CandidateRequisitions';

export const generated = () => {
  return <CandidateRequisitions />;
};

export default {
  title: 'Components/CandidateRequisitions',
  component: CandidateRequisitions,
} as ComponentMeta<typeof CandidateRequisitions>;
