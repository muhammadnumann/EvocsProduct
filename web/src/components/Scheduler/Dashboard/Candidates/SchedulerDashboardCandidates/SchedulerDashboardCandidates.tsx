import { FC } from 'react';

import { Disclosure, Transition } from '@headlessui/react';
import { FolderMinusIcon, FolderOpenIcon } from '@heroicons/react/24/outline';
import { SchedulerDashboardCandidatesQuery } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';

type Props = {
  loading?: boolean;
  candidates: SchedulerDashboardCandidatesQuery['candidates'];
};

const SchedulerDashboardCandidates: FC<Props> = ({ candidates }) => {
  return (
    <div className="min-w-full px-4">
      <Disclosure as="div">
        {({ open }) => (
          <>
            <Disclosure.Button className="hover:group -mx-4 flex min-w-full flex-auto items-start justify-between rounded-md text-left text-gray-400 hover:bg-gray-50 sm:flex sm:items-center sm:px-4">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">
                  Candidates
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the candidates who have been imported into your
                  account.
                </p>
              </div>
              <button className="mt-4 w-8 self-center sm:ml-0 sm:mt-0 sm:flex-none">
                {open ? (
                  <FolderMinusIcon className="rounded-md fill-gray-300 text-sm font-medium text-white group-hover:fill-gray-500 sm:w-auto" />
                ) : (
                  <FolderOpenIcon className="rounded-md fill-gray-300 text-sm font-medium text-white group-hover:fill-gray-500 sm:w-auto" />
                )}
              </button>
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-100 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-100 opacity-0"
            >
              <Disclosure.Panel as="div">
                <div className="-ml-4 mt-2 overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5 sm:-mr-6 md:mr-4">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                        >
                          Workday Candidate Record
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Created by
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {candidates.map((candidate) => (
                        <tr key={candidate.id}>
                          <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                            <Link
                              to={routes.schedulerCandidate({
                                id: candidate.id,
                              })}
                            >
                              {candidate.name}
                            </Link>
                            <dl className="font-normal lg:hidden">
                              <dt className="sr-only">Email</dt>
                              <dd className="mt-1 truncate text-gray-700">
                                {candidate.email}
                              </dd>
                              <dt className="sr-only sm:hidden">
                                Workday Candidate Record
                              </dt>
                              <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                {candidate.wdCandidateID}
                              </dd>
                            </dl>
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                            {candidate.email}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                            {candidate.wdCandidateID}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {candidate.user.email}
                          </td>
                          <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Link
                              to={routes.schedulerCandidate({
                                id: candidate.id,
                              })}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              View
                              <span className="sr-only">
                                , {candidate.name}
                              </span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default SchedulerDashboardCandidates;
