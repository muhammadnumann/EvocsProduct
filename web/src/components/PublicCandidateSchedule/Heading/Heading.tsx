import { FC } from 'react';

import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  MapPinIcon,
  PencilIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { PositionType } from 'types/graphql';

import { assertUnreachable } from 'src/utils/types';
import { dateString } from 'src/utils/utils';

import { Props } from '../types';

const positionTypeString = (positiontype: PositionType): string => {
  switch (positiontype) {
    case 'CONTRACT':
      return 'Contract';
    case 'FULLTIME':
      return 'Full-time';
    default:
      return assertUnreachable(positiontype);
  }
};

type HeadingProps = Props & {
  inEditMode: boolean;
  setInEditMode: React.Dispatch<boolean>;
  saveEnabled: boolean;
  onSave: () => Promise<void>;
};
const Heading: FC<HeadingProps> = ({
  title,
  positionType: pt,
  firstName,
  lastName,
  startTime,
  endTime,
  inEditMode,
  setInEditMode,
  saveEnabled,
  onSave,
}) => {
  const positionType = positionTypeString(pt);
  const name = `${firstName} ${lastName}`;
  const start = new Date(startTime);
  const end = new Date(endTime);

  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <UserCircleIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {name}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <BriefcaseIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {positionType}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapPinIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            Remote
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {`${dateString(start)} - ${dateString(end)}`}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="sm:mr-3">
          <button
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            // disabled={inEditMode}
            onClick={() => setInEditMode(!inEditMode)}
          >
            <PencilIcon
              className="-ml-1 mr-2 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
            {inEditMode ? 'Cancel' : 'Edit'}
          </button>
        </span>

        <span className="ml-2">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!saveEnabled}
            onClick={onSave}
          >
            <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Save
          </button>
        </span>
      </div>
    </div>
  );
};

export default Heading;
