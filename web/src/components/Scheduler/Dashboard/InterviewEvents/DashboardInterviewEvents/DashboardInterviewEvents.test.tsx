import { render } from '@redwoodjs/testing/web';

import DashboardInterviewEvents from './DashboardInterviewEvents';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardInterviewEvents', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardInterviewEvents />);
    }).not.toThrow();
  });
});
