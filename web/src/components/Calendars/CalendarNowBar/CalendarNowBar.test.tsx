import { render } from '@redwoodjs/testing/web';

import CalendarNowBar from './CalendarNowBar';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CalendarNowBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CalendarNowBar />);
    }).not.toThrow();
  });
});
