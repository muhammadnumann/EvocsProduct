import { render } from '@redwoodjs/testing/web';

import { ProductRunnerClientProvider } from './ProductRunnerContext';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ProductRunnerContext', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProductRunnerClientProvider />);
    }).not.toThrow();
  });
});
