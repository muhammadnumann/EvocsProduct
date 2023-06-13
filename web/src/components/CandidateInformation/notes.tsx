import React from 'react';

const arrayData = [
  {
    name: 'Leslie Alexander',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore maxime ratione corporis est laudantium quo.',
  },
  {
    name: 'Michel Foster',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore maxime ratione corporis est laudantium quo.',
  },
  {
    name: 'Dries Vincet',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore maxime ratione corporis est laudantium quo.',
  },
];
function CandidateNotes() {
  return (
    <div className=" overflow-hidden rounded-xl border bg-white">
      <div className="border-b">
        <div className="p-5">
          <h2 className="text-xl font-semibold">Notes</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-8 p-5">
        {arrayData.map((data, index) => {
          return (
            <>
              <div className="flex px-8 pt-5" key={index}>
                <img
                  src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                  alt=""
                  className="mr-3 h-11 w-11 rounded-full bg-gray-400"
                />
                <div>
                  <p className="text-base font-medium">{data.name}</p>
                  <p className="text-base text-gray-700">{data.description}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <p className="text-sm font-medium text-gray-500">4d ago</p>.
                    <button className="text-sm font-medium">Reply</button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="flex w-full bg-gray-50 px-8 pt-5">
        <img
          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
          alt=""
          className="mr-3 h-11 w-11 rounded-full bg-gray-400"
        />
        <div className="w-full">
          <textarea
            className="w-full rounded-lg border border-gray-200 bg-white"
            placeholder="Add a Note"
          />
          <div className="w-full">
            <div className="item flex items-center justify-between border-b py-3">
              <p className="text-gray-400">Some Html is Okay</p>
              <button className="rounded-xl bg-blue-600 px-3 py-2 text-base font-bold text-white">
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateNotes;
