import { render } from '@redwoodjs/testing/web';

import CandidateRequisition from './CandidateRequisition';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CandidateRequisition', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CandidateRequisition />);
    }).not.toThrow();
  });
});
