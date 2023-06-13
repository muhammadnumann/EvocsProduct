import type { ComponentMeta } from '@storybook/react';

import CandidateRequisitionPage from './CandidateRequisitionPage';

export const generated = () => {
  return <CandidateRequisitionPage />;
};

export default {
  title: 'Pages/CandidateRequisitionPage',
  component: CandidateRequisitionPage,
} as ComponentMeta<typeof CandidateRequisitionPage>;
