import React from 'react';

function TabsHeader({ setParams, params }) {
  return (
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul
        className="-mb-px flex flex-wrap text-center text-sm font-medium"
        id="myTab"
        data-tabs-toggle="#myTabContent"
        role="tablist"
      >
        {['Profile', 'Notes', 'Activities'].map((val, index) => {
          return (
            <>
              <li className="mr-2" role="presentation" key={index}>
                <button
                  // className="inline-block rounded-t-lg border-b-2 p-4"
                  className={`inline-block rounded-t-lg border-b-2 text-gray-400 ${
                    params === val
                      ? 'border-red-400 text-gray-600'
                      : 'border-transparent'
                  } p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`}
                  id="dashboard-tab"
                  data-tabs-target="#dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false"
                  onClick={() => {
                    setParams(val);
                  }}
                >
                  {val}
                </button>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default TabsHeader;
