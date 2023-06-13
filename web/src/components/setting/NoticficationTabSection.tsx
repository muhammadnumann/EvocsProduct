import React from 'react';

function NoticficationTabSection() {
  return (
    <div>
      <div className="my-10">
        <p>Event Noticfication</p>
        <div className="flex my-5 items-center gap-5">
          <select
            id="countries"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option selected>Email</option>
            <option value="US">6</option>
          </select>
          <input
            type="text"
            className="block w-20 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="10"
            value={'10'}
          />
          <select
            id="countries"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-16 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option selected>minutes</option>
            <option value="US">6</option>
          </select>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-blue-500 py-2 px-4 font-bold text-blue-500 hover:bg-gray-400">
          <span className="text-2xl">+</span> Add Noticfication
        </button>{' '}
      </div>
      <div className="mt-20">
        <p>All day Event Noticfication</p>
        <div className="flex my-5 items-center gap-5">
          <select
            id="countries"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option selected>Email</option>
            <option value="US">6</option>
          </select>
          <input
            type="text"
            className="block w-20 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="10"
            value={'10'}
          />
          <select
            id="countries"
            className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-16 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option selected>minutes</option>
            <option value="US">6</option>
          </select>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-blue-500 py-2 px-4 font-bold text-blue-500 hover:bg-gray-400">
          <span className="text-2xl">+</span> Add Noticfication
        </button>{' '}
      </div>

      <div className="my-20">
        <p>Genral Noticfications</p>
        <div className="my-2 w-full border-b-2"></div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold">New event</p>
            <p>Someone sends you an invitationto an event</p>
          </div>
          <div>
            <select
              id="countries"
              className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option selected>Email</option>
              <option value="US">6</option>
            </select>
          </div>
        </div>
        <div className="my-2 w-full border-b-2"></div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold">Changed event</p>
            <p>Someone change an event</p>
          </div>
          <div>
            <select
              id="countries"
              className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option selected>None</option>
              <option>Email</option>
              <option value="US">6</option>
            </select>
          </div>
        </div>
        <div className="my-2 w-full border-b-2"></div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold">Cancelled event</p>
            <p>Someone Cancels an event</p>
          </div>
          <div>
            <select
              id="countries"
              className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option selected>None</option>
              <option>Email</option>
              <option value="US">6</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoticficationTabSection;
