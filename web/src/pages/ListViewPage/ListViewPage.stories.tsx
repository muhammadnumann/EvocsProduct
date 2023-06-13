import type { ComponentMeta } from '@storybook/react';

import ListVeiwPage from './ListViewPage';

export const generated = () => {
  return <ListVeiwPage />;
};

export default {
  title: 'Pages/DashboardPage',
  component: ListVeiwPage,
} as ComponentMeta<typeof ListVeiwPage>;
