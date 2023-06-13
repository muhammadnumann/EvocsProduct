import { render } from '@redwoodjs/testing/web';

import Notes from './NotesList';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Notes', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Notes />);
    }).not.toThrow();
  });
});
