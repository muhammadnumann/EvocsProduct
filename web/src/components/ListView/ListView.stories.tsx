// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ListView> = (args) => {
//   return <ListView {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import ListView from './ListView';

export const generated = () => {
  return <ListView />;
};

export default {
  title: 'Components/ListView',
  component: ListView,
} as ComponentMeta<typeof ListView>;
