// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof GoogleGLogoIcon> = (args) => {
//   return <GoogleGLogoIcon {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import GoogleGLogoIcon from './GoogleGLogoIcon';

export const generated = () => {
  return <GoogleGLogoIcon />;
};

export default {
  title: 'Components/GoogleGLogoIcon',
  component: GoogleGLogoIcon,
} as ComponentMeta<typeof GoogleGLogoIcon>;
