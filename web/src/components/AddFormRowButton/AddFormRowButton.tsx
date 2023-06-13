import { FC } from 'react';

type Props<T> = {
  append: (val: T) => void;
  val: T;
  msg: string;
  className: string;
};

const AddFormRowButton: FC<Props<unknown>> = ({
  append,
  val,
  msg,
  className,
}) => {
  return (
    <button
      className={className}
      onClick={(e) => {
        e.preventDefault();
        append(val);
      }}
    >
      <div className="rw-button-icon mr-1">+</div> {msg}
    </button>
  );
};

export default AddFormRowButton;
