import { render } from '@redwoodjs/testing/web';

import EventDayCalendar from './EventDayCalendar';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EventDayCalendar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EventDayCalendar />);
    }).not.toThrow();
  });
});
