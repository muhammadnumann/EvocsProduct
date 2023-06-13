// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CandidateDetail> = (args) => {
//   return <CandidateDetail {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import CandidateDetail from './CandidateDetail';

export const generated = () => {
  return <CandidateDetail />;
};

export default {
  title: 'Components/CandidateDetail',
  component: CandidateDetail,
} as ComponentMeta<typeof CandidateDetail>;
