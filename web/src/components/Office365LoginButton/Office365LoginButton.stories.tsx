// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Office365LoginButton> = (args) => {
//   return <Office365LoginButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import Office365LoginButton from './Office365LoginButton';

export const generated = () => {
  return <Office365LoginButton />;
};

export default {
  title: 'Components/Office365LoginButton',
  component: Office365LoginButton,
} as ComponentMeta<typeof Office365LoginButton>;
