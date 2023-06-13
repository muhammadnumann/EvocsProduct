import React from 'react';

function CandidatetInformation() {
  return (
    <div className=" rounded-xl border bg-white">
      <div className="border-b">
        <div className="p-5">
          <h2 className="text-xl font-semibold">Candidate Information</h2>
          <p className="text-gray-500">Personal Detail and Candidate.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-8 p-5 md:grid-cols-2">
        {[
          { label: 'Candidate for', value: 'Backnd Developer' },
          { label: 'Email', value: 'numan.rfa@gmail.com' },
          { label: 'Salary', value: '75000' },
          { label: 'Phone', value: '(555) 123-123' },
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
        <div className="w-full">
          <p className="font-medium text-gray-500">Attachements</p>
          <div className="rounded-lg border border-gray-200">
            <div className="item flex items-center justify-between border-b border-gray-200 py-3 px-4">
              <div className="flex">resume_front_end.pdf</div>
              <button className="text-base font-bold text-blue-500">
                Download
              </button>
            </div>
            <div className="item flex items-center justify-between border-b py-3 px-4">
              <div className="flex">resume_front_end.pdf</div>
              <button className="text-base font-bold text-blue-500">
                Download
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center ">
          <button className="font-semibold text-gray-500">
            Read Full application
          </button>
        </div>
      </div>
    </div>
  );
}

export default CandidatetInformation;
