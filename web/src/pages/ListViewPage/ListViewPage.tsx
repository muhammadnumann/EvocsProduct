/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import {
  CalendarIcon,
  HomeModernIcon,
  MapIcon,
  Bars3Icon,
  BellAlertIcon,
  UsersIcon,
  UserGroupIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

import ListView from 'src/components/ListView/ListView';
import { classNames } from 'src/utils/utils';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeModernIcon, current: true },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Teams', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Directory', href: '#', icon: UsersIcon, current: false },
  { name: 'Announcements', href: '#', icon: BellAlertIcon, current: false },
  { name: 'Office Map', href: '#', icon: MapIcon, current: false },
];

const ListVeiwPage = () => {
  return (
    <>
      <div className="flex h-screen">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <ListView />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListVeiwPage;
