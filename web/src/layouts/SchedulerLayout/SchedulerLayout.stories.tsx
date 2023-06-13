import type { ComponentMeta, ComponentStory } from '@storybook/react';

import SchedulerLayout from './SchedulerLayout';

export const generated: ComponentStory<typeof SchedulerLayout> = (args) => {
  return <SchedulerLayout {...args} />;
};

export default {
  title: 'Layouts/SchedulerLayout',
  component: SchedulerLayout,
} as ComponentMeta<typeof SchedulerLayout>;
