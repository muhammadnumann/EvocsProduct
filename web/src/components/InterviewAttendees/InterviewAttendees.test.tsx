import { render } from '@redwoodjs/testing/web';

import InterviewAttendees from './InterviewAttendees';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InterviewAttendees', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InterviewAttendees />);
    }).not.toThrow();
  });
});
