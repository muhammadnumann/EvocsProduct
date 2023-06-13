import { useState } from 'react';

import TabsHeader from '../ListViewTabs';
import ActivityTab from '../ListViewTabs/Activities/Activities';
import NotesTabs from '../ListViewTabs/Notes/NotesTab';
import ProfileTab from '../ListViewTabs/Profile/ProfileTab';

import DirectoryList from './list';

const ListView = () => {
  const [params, setParams] = useState('Profile');

  return (
    <>
      <div className="w-5/12">
        <div className="border-b border-gray-300  p-8">
          <h2 className="text-xl font-semibold">Directory</h2>
          <p className="pb-7 text-base text-gray-500">
            Search Directory of 3,018 employees
          </p>
          <div className="flex gap-3">
            <form className="w-full">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Search"
                  required
                />
              </div>
            </form>
            <button className="block h-10 w-10 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm  focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                version="1.1"
                id="Capa_1"
                width="20px"
                height="20px"
                viewBox="0 0 971.986 971.986"
                xmlSpace="preserve"
                style={{ fill: 'rgba(107, 114, 128)' }}
              >
                <g>
                  <path d="M370.216,459.3c10.2,11.1,15.8,25.6,15.8,40.6v442c0,26.601,32.1,40.101,51.1,21.4l123.3-141.3   c16.5-19.8,25.6-29.601,25.6-49.2V500c0-15,5.7-29.5,15.8-40.601L955.615,75.5c26.5-28.8,6.101-75.5-33.1-75.5h-873   c-39.2,0-59.7,46.6-33.1,75.5L370.216,459.3z" />
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div
          className="overflow-y-auto"
          style={{ height: 'calc(100% - 183px)' }}
        >
          <DirectoryList />
        </div>
      </div>
      <div className="w-7/12 overflow-y-auto">
        <div className="h-44 w-full bg-gray-400"></div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
            className="absolute top-[-85px] left-8 h-40 w-40 rounded-full"
            alt=""
          />
        </div>
        <div className="flex items-center justify-end gap-3 p-8">
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm  focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              version="1.1"
              id="Capa_1"
              width="20px"
              height="20px"
              viewBox="0 0 971.986 971.986"
              xmlSpace="preserve"
              style={{ fill: 'rgba(107, 114, 128)' }}
            >
              <g>
                <path d="M370.216,459.3c10.2,11.1,15.8,25.6,15.8,40.6v442c0,26.601,32.1,40.101,51.1,21.4l123.3-141.3   c16.5-19.8,25.6-29.601,25.6-49.2V500c0-15,5.7-29.5,15.8-40.601L955.615,75.5c26.5-28.8,6.101-75.5-33.1-75.5h-873   c-39.2,0-59.7,46.6-33.1,75.5L370.216,459.3z" />
              </g>
            </svg>
            Messages
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm  focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              version="1.1"
              id="Capa_1"
              width="20px"
              height="20px"
              viewBox="0 0 971.986 971.986"
              xmlSpace="preserve"
              style={{ fill: 'rgba(107, 114, 128)' }}
            >
              <g>
                <path d="M370.216,459.3c10.2,11.1,15.8,25.6,15.8,40.6v442c0,26.601,32.1,40.101,51.1,21.4l123.3-141.3   c16.5-19.8,25.6-29.601,25.6-49.2V500c0-15,5.7-29.5,15.8-40.601L955.615,75.5c26.5-28.8,6.101-75.5-33.1-75.5h-873   c-39.2,0-59.7,46.6-33.1,75.5L370.216,459.3z" />
              </g>
            </svg>
            Call
          </button>
        </div>
        <h1 className="px-8 text-3xl font-bold">Ricardo Cooper</h1>

        <div>
          <TabsHeader setParams={setParams} params={params} />
          <div>
            {params === 'Profile' ? (
              <ProfileTab />
            ) : params === 'Notes' ? (
              <div className="p-5">
                <NotesTabs />
              </div>
            ) : (
              <ActivityTab />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListView;
