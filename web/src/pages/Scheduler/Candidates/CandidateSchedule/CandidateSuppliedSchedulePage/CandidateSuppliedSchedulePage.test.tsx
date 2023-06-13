import { render } from '@redwoodjs/testing/web';

import CandidateSuppliedSchedulePage from './CandidateSuppliedSchedulePage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CandidateSuppliedSchedulePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CandidateSuppliedSchedulePage />);
    }).not.toThrow();
  });
});
