import { render } from '@redwoodjs/testing/web';

import SchedulerPublicLayout from './SchedulerPublicLayout';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SchedulerPublicLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SchedulerPublicLayout />);
    }).not.toThrow();
  });
});
