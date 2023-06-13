// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof LinkAccountButton> = (args) => {
//   return <LinkAccountButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import LinkAccountPage from './LinkAccountPage';

export const generated = () => {
  return <LinkAccountPage />;
};

export default {
  title: 'Components/LinkAccountButton',
  component: LinkAccountPage,
} as ComponentMeta<typeof LinkAccountPage>;
