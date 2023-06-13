// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof PublicCandidateScheduleWeekCalendar> = (args) => {
//   return <PublicCandidateScheduleWeekCalendar {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import PublicCandidateScheduleWeekCalendar from './PublicCandidateScheduleWeekCalendar';

export const generated = () => {
  return <PublicCandidateScheduleWeekCalendar />;
};

export default {
  title: 'Components/PublicCandidateScheduleWeekCalendar',
  component: PublicCandidateScheduleWeekCalendar,
} as ComponentMeta<typeof PublicCandidateScheduleWeekCalendar>;
