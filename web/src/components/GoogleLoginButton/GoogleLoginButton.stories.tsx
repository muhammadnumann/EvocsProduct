// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof GoogleLoginButton> = (args) => {
//   return <GoogleLoginButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import GoogleLoginButton from './GoogleLoginButton';

export const generated = () => {
  return <GoogleLoginButton />;
};

export default {
  title: 'Components/GoogleLoginButton',
  component: GoogleLoginButton,
} as ComponentMeta<typeof GoogleLoginButton>;
