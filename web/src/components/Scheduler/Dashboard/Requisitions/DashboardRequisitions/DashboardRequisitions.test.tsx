import { render } from '@redwoodjs/testing/web';

import DashboardRequisitions from './DashboardRequisitions';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardRequisitions', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardRequisitions />);
    }).not.toThrow();
  });
});
