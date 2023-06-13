// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof InterviewSchedulerAuthPopover> = (args) => {
//   return <InterviewSchedulerAuthPopover {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';
import type { ComponentStory } from '@storybook/react';

import InterviewSchedulerAuthPopover from './InterviewSchedulerAuthPopover';

export const Template: ComponentStory<typeof InterviewSchedulerAuthPopover> = (
  args
) => {
  mockCurrentUser({
    id: 1,
  });
  return (
    <div className="grid grid-cols-3">
      <div className="col-start-2">
        <InterviewSchedulerAuthPopover {...args} />
      </div>
    </div>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  requiredAuthStrategies: { google: true },
  configuredAuthStrategies: { google: true },
  userID: 1,
  productID: 1,
};

export default {
  title: 'Components/InterviewSchedulerAuthPopover',
  component: InterviewSchedulerAuthPopover,
} as ComponentMeta<typeof InterviewSchedulerAuthPopover>;
