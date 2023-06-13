// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof AddFormRowButton> = (args) => {
//   return <AddFormRowButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react';

import AddFormRowButton from './AddFormRowButton';

class Appender<T> {
  vals: T[];

  constructor(t?: T[]) {
    this.vals = t ?? [];
  }

  append(t: T) {
    this.vals.push(t);
  }
}

const appender = new Appender([3]);

export const generated = () => {
  return (
    <AddFormRowButton
      append={appender.append}
      val={5}
      msg="hello"
      className="mt-5"
    />
  );
};

export default {
  title: 'Components/AddFormRowButton',
  component: AddFormRowButton,
} as ComponentMeta<typeof AddFormRowButton>;
