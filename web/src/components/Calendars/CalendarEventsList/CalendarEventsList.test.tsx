import { render } from '@redwoodjs/testing/web';

import CalendarEventsList from './CalendarEventsList';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CalendarEventsList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CalendarEventsList />);
    }).not.toThrow();
  });
});
