import { render } from '@redwoodjs/testing/web';

import RequisitionCandidates from './RequisitionCandidates';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RequisitionCandidates', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RequisitionCandidates />);
    }).not.toThrow();
  });
});
