import { render } from '@redwoodjs/testing/web';

import AzureAdLogoIcon from './AzureADLogoIcon';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AzureAdLogoIcon', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AzureAdLogoIcon />);
    }).not.toThrow();
  });
});
