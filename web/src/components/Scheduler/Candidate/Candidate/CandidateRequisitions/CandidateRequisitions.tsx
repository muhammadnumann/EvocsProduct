/* This example requires Tailwind CSS v2.0+ */
import { FC } from 'react';

import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { FindCandidateById } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';

const getInitials = (name: string): string => {
  const split = name.split(' ');
  if (split.length < 2) {
    return name?.slice(0, 1);
  }

  return `${split[0].slice(0, 1)} ${split[split.length - 1].slice(0, 1)}`;
};

const colors = [
  'bg-pink-600',
  'bg-purple-600',
  'bg-yellow-500',
  'bg-green-500',
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const CandidateRequisitions: FC<{
  requisitions: FindCandidateById['candidate']['requsitions'];
}> = ({ requisitions }) => {
  const numColors = colors.length;
  return (
    <div>
      <h2 className="text-xs font-medium uppercase tracking-wide text-gray-500">
        Requisitions
      </h2>
      <ul className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {requisitions &&
          requisitions.map((requisition, i) => (
            <li
              key={requisition.id}
              className="col-span-1 m-0 flex rounded-md shadow-sm"
            >
              <div
                className={classNames(
                  colors[i % numColors],
                  'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white'
                )}
              >
                {getInitials(requisition.title)}
              </div>
              <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
                <div className="flex-1 truncate px-4 py-2 text-sm">
                  <Link
                    to={routes.schedulerRequisition({ id: requisition.id })}
                    className="font-medium text-gray-900 hover:text-gray-600"
                  >
                    {requisition.title}
                  </Link>
                  <p className="text-gray-500">{requisition.status}</p>
                </div>
                <div className="flex-shrink-0 pr-2">
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
