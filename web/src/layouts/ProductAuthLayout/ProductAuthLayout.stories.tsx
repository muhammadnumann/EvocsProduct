import type { ComponentMeta, ComponentStory } from '@storybook/react';

import ProductAuthLayout from './ProductAuthLayout';

export const generated: ComponentStory<typeof ProductAuthLayout> = (args) => {
  return <ProductAuthLayout {...args} />;
};

export default {
  title: 'Layouts/ProductAuthLayout',
  component: ProductAuthLayout,
} as ComponentMeta<typeof ProductAuthLayout>;
