// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof OrgIdContext> = (args) => {
//   return <OrgIdContext {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import { OrgIDProvider } from './OrgIDContext';

export const generated = () => {
  return <OrgIDProvider />;
};

export default {
  title: 'Components/OrgIdContext',
  component: OrgIDProvider,
} as ComponentMeta<typeof OrgIDProvider>;
