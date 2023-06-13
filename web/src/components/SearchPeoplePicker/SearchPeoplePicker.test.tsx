import { render } from '@redwoodjs/testing/web';

import SearchPeoplePicker from './SearchPeoplePicker';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SearchPeoplePicker', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SearchPeoplePicker />);
    }).not.toThrow();
  });
});
