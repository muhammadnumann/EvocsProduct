import { render } from '@redwoodjs/testing/web';

import AddFormRowButton from './AddFormRowButton';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

class Appender<T> {
  vals: T[];

  constructor(t?: T[]) {
    this.vals = t ?? [];
  }

  append(t: T) {
    this.vals.push(t);
  }
}

describe('AddFormRowButton', () => {
  const appender = new Appender<number>();
  it('renders successfully', () => {
    expect(() => {
      render(
        <AddFormRowButton
          append={appender.append}
          val={5}
          msg="hello"
          className="mt-5"
        />
      );
    }).not.toThrow();
  });
});
