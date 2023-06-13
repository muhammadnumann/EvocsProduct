import { render } from '@redwoodjs/testing/web';

import ListVeiwPage from './ListViewPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DashboardPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListVeiwPage />);
    }).not.toThrow();
  });
});
