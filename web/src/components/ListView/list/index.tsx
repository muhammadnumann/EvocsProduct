import React from 'react';
interface Directory {
  name: string;
  role: string;
  diveder?: boolean;
}
const dataArray: Directory[] = [
  { name: 'Leslie', role: 'Co-Founder', diveder: true },
  { name: 'Leslie', role: 'Co-Founder', diveder: false },
  { name: 'Leslie', role: 'Co-Founder', diveder: false },
  { name: 'Leslie', role: 'Co-Founder', diveder: true },
  { name: 'Leslie', role: 'Co-Founder', diveder: false },
  { name: 'Leslie', role: 'Co-Founder', diveder: false },
  { name: 'Leslie', role: 'Co-Founder', diveder: true },
  { name: 'Leslie', role: 'Co-Founder', diveder: false },
  { name: 'Leslie', role: 'Co-Founder', diveder: false },
  { name: 'Leslie', role: 'Co-Founder', diveder: true },
  { name: 'Leslie', role: 'Co-Founder', diveder: false },
  { name: 'Leslie', role: 'Co-Founder', diveder: false },
  { name: 'Leslie', role: 'Co-Founder', diveder: true },
  { name: 'Leslie', role: 'Co-Founder', diveder: false },
  { name: 'Leslie', role: 'Co-Founder', diveder: false },
];
function DirectoryList() {
  return (
    <>
      {dataArray.map((val, index) => {
        if (val.diveder) {
          return (
            <div
              key={index}
              className=" border-b border-gray-300 bg-gray-50 px-8"
            >
              <p>A</p>
            </div>
          );
        }
        return (
          <div className="flex border-b py-5 px-8" key={index}>
            <img
              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
              alt=""
              className="mr-3 h-11 w-11 rounded-full bg-gray-400"
            />
            <div>
              <p className="text-sm font-medium">Leslie Abbott</p>
              <p className="text-sm ">Co-Founder / CEO</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default DirectoryList;
