// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof RemoveFormRowButton> = (args) => {
//   return <RemoveFormRowButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import RemoveFormRowButton from './RemoveFormRowButton';

export const generated = () => {
  return <RemoveFormRowButton />;
};

export default {
  title: 'Components/RemoveFormRowButton',
  component: RemoveFormRowButton,
} as ComponentMeta<typeof RemoveFormRowButton>;
