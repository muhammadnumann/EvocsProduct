import { render } from '@redwoodjs/testing/web';

import CandidateRequisitionPage from './CandidateRequisitionPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CandidateRequisitionPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CandidateRequisitionPage />);
    }).not.toThrow();
  });
});
