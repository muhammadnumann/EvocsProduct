// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ColoredBadge> = (args) => {
//   return <ColoredBadge {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';
import type { ComponentStory } from '@storybook/react';

import ColoredBadge, { BadgeColor } from './ColoredBadge';

export const Template: ComponentStory<typeof ColoredBadge> = (args) => {
  return <ColoredBadge {...args} />;
};

export const Red = Template.bind({});
Red.args = {
  color: BadgeColor.Red,
  text: 'Badge',
};

export default {
  title: 'Components/ColoredBadge',
  component: ColoredBadge,
} as ComponentMeta<typeof ColoredBadge>;
