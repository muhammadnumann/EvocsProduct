import { render } from '@redwoodjs/testing/web';

import CandidateDetail from './CandidateDetail';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CandidateDetail', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CandidateDetail />);
    }).not.toThrow();
  });
});
