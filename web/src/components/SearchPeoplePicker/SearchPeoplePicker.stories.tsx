/* eslint-disable react-hooks/rules-of-hooks */
// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof SearchPeoplePicker> = (args) => {
//   return <SearchPeoplePicker {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import { useState } from 'react';

import {
  EmailAddress,
  Name,
  Person,
} from '@buf/bufbuild_connect-web_evocs_commonschema/external/googleapidefs/people/v1/people_pb';
import type { ComponentMeta } from '@storybook/react';

import SearchPeoplePicker from './SearchPeoplePicker';

const people: Person[] = [
  {
    etag: '213',
    names: [{ displayName: 'Spencer Murray' } as Name],
    emailAddresses: [{ value: 'spencermurray@gmail.com' } as EmailAddress],
    photos: [
      {
        url: 'https://lh3.googleusercontent.com/c5dqxl-2uHZ82ah9p7yxrVF1ZssrJNSV_15Nu0TUZwzCWqmtoLxCUJgEzLGtxsrJ6-v6R6rKU_-FYm881TTiMCJ_=s1600',
      },
    ],
  } as Person,
];

export const generated = () => {
  const [_query, setQuery] = useState('');
  const [_selectedPerson, setSelectedPerson] = useState<Person>();
  return (
    <SearchPeoplePicker
      people={people}
      setQuery={setQuery}
      setSelectedPerson={setSelectedPerson}
    />
  );
};

export default {
  title: 'Components/SearchPeoplePicker',
  component: SearchPeoplePicker,
} as ComponentMeta<typeof SearchPeoplePicker>;
