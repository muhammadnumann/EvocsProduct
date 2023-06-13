import { render } from '@redwoodjs/testing/web';

import SchedulerHomePage from './SchedulerHomePage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SchedulerHomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SchedulerHomePage />);
    }).not.toThrow();
  });
});
