// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ApplicantDetail> = (args) => {
//   return <ApplicantDetail {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import ApplicantDetail from './ApplicantDetail';

export const generated = () => {
  return <ApplicantDetail />;
};

export default {
  title: 'Components/ApplicantDetail',
  component: ApplicantDetail,
} as ComponentMeta<typeof ApplicantDetail>;
