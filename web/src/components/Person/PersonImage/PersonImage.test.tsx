import { render } from '@redwoodjs/testing/web';

import { PersonImage } from './PersonImage';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PersonImage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PersonImage />);
    }).not.toThrow();
  });
});
