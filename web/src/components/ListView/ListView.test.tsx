import { render } from '@redwoodjs/testing/web';

import ListView from './ListView';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ListView', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListView />);
    }).not.toThrow();
  });
});
