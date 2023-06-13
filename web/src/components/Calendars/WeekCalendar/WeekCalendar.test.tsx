import { render } from '@redwoodjs/testing/web';

import WeekCalendar from './WeekCalendar';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WeekCalendar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WeekCalendar />);
    }).not.toThrow();
  });
});
