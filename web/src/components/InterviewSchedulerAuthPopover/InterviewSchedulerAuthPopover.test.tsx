import { render } from '@redwoodjs/testing/web';

import InterviewSchedulerAuthPopover from './InterviewSchedulerAuthPopover';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InterviewSchedulerAuthPopover', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InterviewSchedulerAuthPopover />);
    }).not.toThrow();
  });
});
