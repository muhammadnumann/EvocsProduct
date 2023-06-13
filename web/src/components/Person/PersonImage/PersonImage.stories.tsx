// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof PersonImage> = (args) => {
//   return <PersonImage {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import { PersonImage } from './PersonImage';

export const generated = () => {
  return <PersonImage />;
};

export default {
  title: 'Components/PersonImage',
  component: PersonImage,
} as ComponentMeta<typeof PersonImage>;
