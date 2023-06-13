import React from 'react';

import { useLocation } from '@redwoodjs/router';

interface TabProps {
  tabData: {
    tabName: string;
    hash: string;
  }[];
}
function TabSection({ tabData }: TabProps) {
  const tabHash = useLocation().hash;

  return (
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul
        className="-mb-px flex flex-wrap text-center text-sm font-medium"
        id="myTab"
        data-tabs-toggle="#myTabContent"
        role="tablist"
      >
        {tabData.map((val, ind) => {
          return (
            <>
              <li className="mr-2" role="presentation" key={ind}>
                <button
                  className={`inline-block rounded-t-lg border-b-2 p-4
                      ${tabHash === `#${val.hash}`
                      ? 'border-red-500 text-red-500'
                      : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}
                  id="profile-tab"
                  data-tabs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                  onClick={() => {
                    window.location.hash = val.hash;
                  }}
                >
                  {val.tabName}
                </button>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default TabSection;
