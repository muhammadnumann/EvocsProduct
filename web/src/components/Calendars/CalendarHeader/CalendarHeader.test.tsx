import { render } from '@redwoodjs/testing/web';

import CalendarHeader from './CalendarHeader';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CalendarHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CalendarHeader />);
    }).not.toThrow();
  });
});
