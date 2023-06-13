import { render } from '@redwoodjs/testing/web';

import EventCalendar from './EventCalendar';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EventCalendar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EventCalendar />);
    }).not.toThrow();
  });
});
