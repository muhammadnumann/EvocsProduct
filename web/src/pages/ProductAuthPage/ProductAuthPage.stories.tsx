import type { ComponentMeta, ComponentStory } from '@storybook/react';

import ProductAuthPage from './ProductAuthPage';

export const generated: ComponentStory<typeof ProductAuthPage> = (args) => {
  return <ProductAuthPage id={'42'} {...args} />;
};

export default {
  title: 'Pages/ProductAuthPage',
  component: ProductAuthPage,
} as ComponentMeta<typeof ProductAuthPage>;
