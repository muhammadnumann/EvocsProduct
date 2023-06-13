import React from 'react';

function ProfileTab() {
  return (
    <>
      <div className="grid grid-cols-1 gap-y-8 p-5 md:grid-cols-2">
        {[
          { label: 'Phone', value: '+1 (555) 123-1234' },
          { label: 'Email', value: 'email@example.com' },
          { label: 'Title', value: 'Senior Frontend Developer' },
          { label: 'Team', value: 'Workday - Products' },
          { label: 'Location', value: 'San Francisco' },
          // { label: 'Sits', value: 'Sits' },
          { label: 'Expected Salary', value: '$75,000' },
          { label: 'Birthday', value: 'Jan 27, 2002' },
        ].map((data, index) => {
          return (
            <>
              <div key={index}>
                <p className="font-medium text-gray-500">{data.label}</p>
                <p>{data.value}</p>
              </div>
            </>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-y-8 p-5">
        <div className="w-full">
          <p className="font-medium text-gray-500">About</p>
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At
            doloribus aliquam incidunt? Reprehenderit quaerat pariatur expedita
            sapiente minima hic, aliquam veritatis ex consectetur eligendi rem,
            distinctio aliquid iste sed est.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-8 p-5">
        <div className="">
          <p className="font-medium text-gray-500">Team</p>
          <div className="grid grid-cols-1 gap-8 py-5 md:grid-cols-2">
            <div className="flex rounded-lg border border-gray-300 py-5 px-8">
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
            <div className="flex rounded-lg border border-gray-300 py-5 px-8">
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
            <div className="flex rounded-lg border border-gray-300 py-5 px-8">
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
            <div className="flex rounded-lg border border-gray-300 py-5 px-8">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileTab;
