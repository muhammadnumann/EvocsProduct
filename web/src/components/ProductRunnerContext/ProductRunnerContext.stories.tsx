// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ProductRunnerContext> = (args) => {
//   return <ProductRunnerContext {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import { ProductRunnerClientProvider } from './ProductRunnerContext';

export const generated = () => {
  return <ProductRunnerClientProvider />;
};

export default {
  title: 'Components/ProductRunnerContext',
  component: ProductRunnerClientProvider,
} as ComponentMeta<typeof ProductRunnerClientProvider>;
