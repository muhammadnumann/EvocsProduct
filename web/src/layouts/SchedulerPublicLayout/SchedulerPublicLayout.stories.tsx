import type { ComponentMeta, ComponentStory } from '@storybook/react';

import SchedulerPublicLayout from './SchedulerPublicLayout';

export const generated: ComponentStory<typeof SchedulerPublicLayout> = (
  args
) => {
  return <SchedulerPublicLayout {...args} />;
};

export default {
  title: 'Layouts/SchedulerPublicLayout',
  component: SchedulerPublicLayout,
} as ComponentMeta<typeof SchedulerPublicLayout>;
