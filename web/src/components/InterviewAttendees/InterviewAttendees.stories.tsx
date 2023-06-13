// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof InterviewAttendees> = (args) => {
//   return <InterviewAttendees {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import {
  Person,
  Photo,
} from '@buf/bufbuild_connect-web_evocs_commonschema/external/googleapidefs/people/v1/people_pb';
import type { ComponentMeta } from '@storybook/react';

import InterviewAttendees from './InterviewAttendees';

export const generated = () => {
  const people: Person[] = [
    {
      etag: '123',
      photos: [
        {
          url: 'https://lh3.googleusercontent.com/c5dqxl-2uHZ82ah9p7yxrVF1ZssrJNSV_15Nu0TUZwzCWqmtoLxCUJgEzLGtxsrJ6-v6R6rKU_-FYm881TTiMCJ_=s1600',
        } as Photo,
      ],
      names: [
        {
          displayName: 'Dan Russo',
        },
      ],
    } as Person,
    {
      etag: '123',
      photos: [],
      names: [
        {
          displayName: 'Siri Russo',
        },
      ],
      emailAddresses: [
        {
          value: 'dan@evocs.tech',
        },
      ],
    } as Person,
  ];

  return <InterviewAttendees people={people} />;
};

export default {
  title: 'Components/InterviewAttendees',
  component: InterviewAttendees,
} as ComponentMeta<typeof InterviewAttendees>;
