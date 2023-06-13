import { render } from '@redwoodjs/testing/web';

import DayCalendar from './DayCalendar';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DayCalendar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DayCalendar />);
    }).not.toThrow();
  });
});
