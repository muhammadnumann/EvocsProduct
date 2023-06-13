import { render } from '@redwoodjs/testing/web';

import PublicCandidateSchedule from './PublicCandidateSchedule';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PublicCandidateSchedule', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PublicCandidateSchedule />);
    }).not.toThrow();
  });
});
