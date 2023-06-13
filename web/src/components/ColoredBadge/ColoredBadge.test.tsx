import { render } from '@redwoodjs/testing/web';

import ColoredBadge from './ColoredBadge';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ColoredBadge', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ColoredBadge />);
    }).not.toThrow();
  });
});
