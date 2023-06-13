import React from 'react';

function GenralTabSection() {
  return (
    <>
      <div className="mt-7">
        <h2 className="text-xl">Profile</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        <div className="my-5 w-full border-b-2"></div>
        <div className="grid grid-cols-3">
          <p>Name</p>
          <p>Tony Stark</p>
          <div className="flex items-center justify-end ">
            <button className="font-semibold text-blue-500">Update</button>
          </div>
        </div>
        <div className="my-5 w-full border-b-2"></div>
        <div className="grid grid-cols-3">
          <p>Photo</p>
          <div className="h-[40px] w-[40px] rounded-full bg-slate-400" />
          <div className="flex items-center justify-end gap-4">
            <button className="font-semibold text-blue-500">Update</button>
            <div className="h-[20px] border-r-2 "></div>
            <button className="font-semibold text-blue-500">remove</button>
          </div>
        </div>
        <div className="my-5 w-full border-b-2"></div>
        <div className="grid grid-cols-3">
          <p>Email</p>
          <p>tony@demo.com</p>
          <div className="flex items-center justify-end ">
            <button className="font-semibold text-blue-500">Update</button>
          </div>
        </div>
        <div className="my-5 w-full border-b-2"></div>
        <div className="grid grid-cols-3">
          <p>Job Title</p>
          <p>Developer</p>
          <div className="flex items-center justify-end ">
            <button className="font-semibold text-blue-500">Update</button>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <h2 className="text-xl">Account</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        <div className="my-5 w-full border-b-2"></div>
        <div className="grid grid-cols-3">
          <p>Language</p>
          <p>English</p>
          <div className="flex items-center justify-end ">
            <button className="font-semibold text-blue-500">Update</button>
          </div>
        </div>
        <div className="my-5 w-full border-b-2"></div>
        <div className="grid grid-cols-3">
          <p>Date Format</p>
          <p>DD-MM-YYYY</p>
          <div className="flex items-center justify-end gap-4">
            <button className="font-semibold text-blue-500">Update</button>
            <div className="h-[20px] border-r-2 "></div>
            <button className="font-semibold text-blue-500">remove</button>
          </div>
        </div>
        <div className="my-5 w-full border-b-2"></div>
        <div className="flex items-center justify-between">
          <p>AutoMatic TimeZone</p>
          <div>
            <label className="relative mt-0 inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" defaultChecked />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700" />
            </label>
          </div>
        </div>
        <div className="my-5 w-full border-b-2"></div>
        <div className="flex items-center justify-between">
          <p>Auto Update Application data</p>
          <div>
            <label className="relative mt-0 inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" defaultChecked />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700" />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default GenralTabSection;
