import { render } from '@redwoodjs/testing/web';

import GoogleLoginButton from './GoogleLoginButton';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GoogleLoginButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GoogleLoginButton />);
    }).not.toThrow();
  });
});
