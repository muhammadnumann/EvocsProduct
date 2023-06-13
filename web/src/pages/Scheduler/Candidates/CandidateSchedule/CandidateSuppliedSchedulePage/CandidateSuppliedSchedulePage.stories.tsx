import type { ComponentMeta } from '@storybook/react';

import CandidateSuppliedSchedulePage from './CandidateSuppliedSchedulePage';

export const generated = () => {
  return <CandidateSuppliedSchedulePage />;
};

export default {
  title: 'Pages/CandidateSuppliedSchedulePage',
  component: CandidateSuppliedSchedulePage,
} as ComponentMeta<typeof CandidateSuppliedSchedulePage>;
