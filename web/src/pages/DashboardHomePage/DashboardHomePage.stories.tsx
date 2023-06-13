import type { ComponentMeta } from '@storybook/react';

import DashboardHomePage from './DashboardHomePage';

export const generated = () => {
  return <DashboardHomePage />;
};

export default {
  title: 'Pages/DashboardHomePage',
  component: DashboardHomePage,
} as ComponentMeta<typeof DashboardHomePage>;
