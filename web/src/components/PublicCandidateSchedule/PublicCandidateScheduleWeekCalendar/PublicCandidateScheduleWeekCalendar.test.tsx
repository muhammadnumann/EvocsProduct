import { render } from '@redwoodjs/testing/web';

import PublicCandidateScheduleWeekCalendar from './PublicCandidateScheduleWeekCalendar';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PublicCandidateScheduleWeekCalendar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PublicCandidateScheduleWeekCalendar />);
    }).not.toThrow();
  });
});
