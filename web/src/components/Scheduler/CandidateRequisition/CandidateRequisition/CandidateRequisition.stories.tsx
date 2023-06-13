// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CandidateRequisition> = (args) => {
//   return <CandidateRequisition {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';
import type { FindCandidateRequisitionDetailQuery } from 'types/graphql';

import CandidateRequisition from './CandidateRequisition';

const subHoursFromnow = (hours: number): Date => {
  const d = new Date();
  const fut = d.setHours(d.getHours() - hours);
  return new Date(fut);
};

const subDaysFromNow = (days: number): Date => {
  const now = new Date();
  const fut = now.setDate(now.getDate() - days);
  return new Date(fut);
};

export const generated = () => {
  mockCurrentUser({
    userInfo: {
      email: 'mocked@evocs.tech',
      name: 'Mock User',
      picture:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
  });
  const Candidate = {
    name: 'Roy Tan',
    email: 'roy@evocs.tech',
    profilePictureURL:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    Attachments: [
      {
        id: 4214,
        title: 'resume_front_end_developer.pdf',
        url: '#',
      },
      {
        id: 431,
        title: 'coverletter_front_end_developer.pdf',
        url: '#',
      },
    ],
  };
  const Requisition = { id: 1, title: 'Engineering Manager' };
  const Notes: FindCandidateRequisitionDetailQuery['Notes'] = [
    {
      id: 1,
      content:
        'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
      createdAt: subHoursFromnow(15).toISOString(),
      User: {
        id: 1,
        name: 'L. Johnson Silver',
        email: 'ljohn@evocs.tech',
        avatarURL:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 2,
      content:
        'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
      createdAt: subDaysFromNow(1.5).toISOString(),
      User: {
        id: 1,
        name: 'L. Johnson Silver',
        email: 'ljohn@evocs.tech',
        avatarURL:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
  ];
  return (
    <CandidateRequisition
      candidateRequisitionDetail={{ Candidate, Requisition, Notes }}
    />
  );
};

export default {
  title: 'Components/CandidateRequisition',
  component: CandidateRequisition,
} as ComponentMeta<typeof CandidateRequisition>;
