import { render } from '@redwoodjs/testing/web';

import RemoveFormRowButton from './RemoveFormRowButton';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RemoveFormRowButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RemoveFormRowButton />);
    }).not.toThrow();
  });
});
