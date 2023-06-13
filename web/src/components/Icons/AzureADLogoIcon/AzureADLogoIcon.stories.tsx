// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof AzureAdLogoIcon> = (args) => {
//   return <AzureAdLogoIcon {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta, ComponentStory } from '@storybook/react';

import AzureADLogoIcon from './AzureADLogoIcon';

export const Template: ComponentStory<typeof AzureADLogoIcon> = (args) => {
  return <AzureADLogoIcon {...args} />;
};

export const Shrunk = Template.bind({});
Shrunk.args = {
  width: 64,
  height: 64,
};

export default {
  title: 'Components/AzureAdLogoIcon',
  component: AzureADLogoIcon,
} as ComponentMeta<typeof AzureADLogoIcon>;
