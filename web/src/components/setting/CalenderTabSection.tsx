import React from 'react';

function CalenderTabSection() {
  return (
    <div>
      <div className="mt-7">
        <h2 className="text-xl font-semibold">Calender</h2>
        <div className="flex items-center gap-4 ">
          <p className="mb-3">Pre-format notes I create from events</p>
          <div>
            <label className="relative mt-0 inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" defaultChecked />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700" />
            </label>
          </div>
        </div>
        <div className="my-5 w-full border-b-2"></div>
        <div className="mt-3">
          <label
            htmlFor="countries"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Remind me to take notes:
          </label>
          <div className="flex items-center gap-5">
            <div className="w-1/3">
              <select className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                <option selected>5 min before Start</option>
                <option value="US">6</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 mt-0 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Desktop
              </label>
            </div>
            <div className="flex items-center">
              <input
                defaultChecked
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="checked-checkbox"
                className="ml-2 mt-0 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Mobile
              </label>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <label
            htmlFor="countries"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Remind me to open notes:
          </label>
          <div className="flex items-center gap-5">
            <div className="w-1/3">
              <select className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                <option selected>5 min before Start</option>
                <option value="US">6</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 mt-0 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Desktop
              </label>
            </div>
            <div className="flex items-center">
              <input
                defaultChecked
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="checked-checkbox"
                className="ml-2 mt-0 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Mobile
              </label>
            </div>
          </div>
        </div>
        <div className="flex mt-10 items-center justify-end gap-6 md:justify-center">
          <button className="rounded border border-gray-500 bg-transparent py-2 px-4 font-semibold text-gray-700 hover:border-transparent hover:bg-gray-500 hover:text-white">
            Cancell
          </button>
          <button className="rounded border bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalenderTabSection;
