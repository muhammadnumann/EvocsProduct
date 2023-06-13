import { render } from '@redwoodjs/testing/web';

import { OrgIDProvider } from './OrgIDContext';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OrgIdContext', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrgIDProvider />);
    }).not.toThrow();
  });
});
