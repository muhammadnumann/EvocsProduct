import { render } from '@redwoodjs/testing/web';

import MonthCalendar from './MonthCalendar';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MonthCalendar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MonthCalendar />);
    }).not.toThrow();
  });
});
