import { render } from '@redwoodjs/testing/web';

import SchedulerDashboardCandidates from './SchedulerDashboardCandidates';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SchedulerDashboardCandidates', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SchedulerDashboardCandidates />);
    }).not.toThrow();
  });
});
