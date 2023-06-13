import { render } from '@redwoodjs/testing/web';

import ProductAuthLayout from './ProductAuthLayout';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ProductAuthLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProductAuthLayout />);
    }).not.toThrow();
  });
});
