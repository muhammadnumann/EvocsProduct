import { render } from '@redwoodjs/testing/web';

import CandidateRequisitions from './CandidateRequisitions';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CandidateRequisitions', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CandidateRequisitions />);
    }).not.toThrow();
  });
});
