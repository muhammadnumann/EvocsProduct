import type { ComponentMeta } from '@storybook/react';

import SchedulerHomePage from './SchedulerHomePage';

export const generated = () => {
  return <SchedulerHomePage />;
};

export default {
  title: 'Pages/SchedulerHomePage',
  component: SchedulerHomePage,
} as ComponentMeta<typeof SchedulerHomePage>;
