import { FC } from 'react';

import { XMarkIcon } from '@heroicons/react/24/outline';

type Props = {
  remove: (index: number) => void;
  index: number;
  className: string;
};

const RemoveFormRowButton: FC<Props> = ({ remove, index, className }) => {
  return (
    <button
      className={className}
      onClick={(e) => {
        e.preventDefault();
        remove(index);
      }}
    >
      <XMarkIcon className="h-6 w-6 text-gray-400 hover:rounded-md hover:bg-slate-300 hover:text-red-600 active:bg-slate-400 active:text-red-700" />
    </button>
  );
};

export default RemoveFormRowButton;
