import React from 'react';

import { Recuiterdata } from './formData';

function RecuitTabSection() {
  return (
    <div>
      {Recuiterdata.map((val, ind) => {
        return (
          <>
            <div className="flex items-center justify-between" key={ind}>
              <div>
                <p className="font-bold">{val.title}</p>
                <p>{val.detail}</p>
              </div>
              <div>
                <label className="relative mt-0 inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    defaultChecked
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700" />
                </label>
              </div>
            </div>
            <div className="my-5 w-full border-b-2"></div>
          </>
        );
      })}
    </div>
  );
}

export default RecuitTabSection;
