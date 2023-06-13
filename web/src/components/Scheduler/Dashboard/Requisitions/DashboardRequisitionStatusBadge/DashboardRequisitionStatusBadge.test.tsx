import { render } from '@redwoodjs/testing/web';

import DashboardRequisitionStatusBadge from './DashboardRequisitionStatusBadge';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardRequisitionStatusBadge', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardRequisitionStatusBadge />);
    }).not.toThrow();
  });
});
