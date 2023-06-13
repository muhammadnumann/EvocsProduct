import { render } from '@redwoodjs/testing/web';

import Office365LoginButton from './Office365LoginButton';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Office365LoginButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Office365LoginButton />);
    }).not.toThrow();
  });
});
