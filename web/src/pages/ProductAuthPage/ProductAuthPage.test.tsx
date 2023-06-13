import { render } from '@redwoodjs/testing/web';

import ProductAuthPage from './ProductAuthPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ProductAuthPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProductAuthPage id={'42'} />);
    }).not.toThrow();
  });
});
