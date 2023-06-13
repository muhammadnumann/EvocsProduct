import { render } from '@redwoodjs/testing/web';

import LinkAccountPage from './LinkAccountPage';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LinkAccountButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LinkAccountPage />);
    }).not.toThrow();
  });
});
