import { render } from '@redwoodjs/testing/web';

import InterviewSchedulerProviderLogoIcon from './InterviewSchedulerProviderLogoIcon';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InterviewSchedulerProviderLogoIcon', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InterviewSchedulerProviderLogoIcon />);
    }).not.toThrow();
  });
});
