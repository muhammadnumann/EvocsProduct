import { render } from '@redwoodjs/testing/web';

import ApplicantDetail from './ApplicantDetail';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ApplicantDetail', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ApplicantDetail />);
    }).not.toThrow();
  });
});
