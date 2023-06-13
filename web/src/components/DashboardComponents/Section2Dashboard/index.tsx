import { ArrowSmallUpIcon } from '@heroicons/react/24/outline';

const jobs = [
  {
    id: 1,
    count: 2,
    name: 'Accountant',
    status: 'Day to Deadline',
    ispromoted: true,
    visits: 2,
    candidate: 7,
    conversion: 100,
    accession: '',
    jobtype: '',
    created: 'September 25, 2022',
    departement: 'Sales',
    deadline: 'October 20, 2023',
  },
  {
    id: 2,
    count: 2,
    name: 'Marketing Strategy And Planning',
    status: 'Candidate Handled',
    ispromoted: true,
    visits: 2,
    candidate: 7,
    conversion: 100,

    accession: '',
    jobtype: '',
    created: 'September 25, 2022',
    departement: 'Marketing',
    deadline: '-',
  },
  {
    id: 3,
    count: 2,
    name: 'Hr Chef',
    status: 'Await Promotion',
    ispromoted: true,
    visits: 16,
    candidate: 5,
    conversion: 33.1,
    accession: '',
    jobtype: '',
    created: 'September 25, 2022',
    departement: 'IT',
    deadline: 'October 20, 2023',
  },
  {
    id: 4,
    count: 2,
    name: 'Ledertrainee',
    status: 'Candidate Handled',
    ispromoted: false,
    visits: 0,
    candidate: 0,
    conversion: 0,
    accession: '',
    jobtype: '',
    created: 'September 25, 2022',
    departement: 'Sales',
    deadline: '-',
  },
];

const Section2Dashboard = () => {
  return (
    <div>
      <h3 className="mt-7 text-lg font-medium leading-6 text-gray-900">
        Recruitment
      </h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-2">
        {jobs.map((data, index) => {
          return (
            <div key={index}>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className=" bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-start text-lg font-semibold">
                    <div className="flex items-center justify-between gap-x-2 font-medium text-gray-600 hover:text-gray-500">
                      {data.name}
                      <div className="border-grey-500 flex items-center gap-1 rounded-md border-2 px-2 text-sm text-gray-600">
                        <div
                          className={
                            data.ispromoted
                              ? 'h-[5px] w-[5px] rounded-full bg-green-600'
                              : 'h-[5px] w-[5px] rounded-full border border-gray-700 bg-white'
                          }
                        ></div>
                        {data.ispromoted ? 'Promoted' : 'Draft'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 sm:pt-6 ">
                  <div className="flex flex-row justify-between">
                    <div className="flex-col">
                      <div className="flex items-center gap-2 px-4 sm:px-6">
                        <span className="flex h-[35px] w-[35px] items-center justify-center  rounded-full bg-[#ddeeff] text-[#386592] ">
                          {data.count}
                        </span>
                        <p>{data.status}</p>
                      </div>
                    </div>
                    <div className="flex-col">
                      <div className=" flex flex-row -space-x-2 space-y-0 px-4">
                        <div className='class="flex " flex h-[35px] w-[35px] items-center justify-center rounded-full  border border-white bg-[#ddeeff] text-[#386592]'>
                          GA
                        </div>
                        <div className='class="flex " flex h-[35px] w-[35px] items-center justify-center rounded-full  border border-white bg-[#ddeeff] text-[#386592]'>
                          GA
                        </div>
                        <div className='class="flex " flex h-[35px] w-[35px] items-center justify-center rounded-full  border border-white bg-[#ddeeff] text-[#386592]'>
                          GA
                        </div>
                        <div className='class="flex " flex h-[35px] w-[35px] items-center justify-center rounded-full  border border-white bg-[#ddeeff] text-[#386592]'>
                          GA
                        </div>
                      </div>
                    </div>
                  </div>
                  {data.ispromoted ? (
                    <div className="mt-4 grid grid-cols-3 divide-x divide-[#2f95fa] border border-[#2f95fa] bg-[#ddeeff]">
                      <div className="flex flex-col items-center justify-center p-3">
                        <p>Visits</p>
                        <p className="text-lg font-semibold">{data.visits}</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-3">
                        <p>Candidates</p>
                        <p className="text-lg font-semibold">
                          {data.candidate}
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-3">
                        <p>Conversion</p>
                        <p className="flex gap-1 text-lg font-semibold">
                          {data.conversion}%{' '}
                          {data.conversion > 0 ? (
                            <ArrowSmallUpIcon
                              className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                              aria-hidden="true"
                            />
                          ) : (
                            ''
                          )}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 flex h-[76px] items-center justify-center border border-red-200 bg-red-100 p-3 text-red-700">
                      Job is not promoted yet
                    </div>
                  )}
                  <div className="mt-10 mb-5 flex items-center justify-center px-4 sm:px-6">
                    <div className="grid grid-cols-2 gap-4 font-semibold">
                      <div className="grid gap-y-4">
                        <p className="text-sm text-gray-400">ACCESSION</p>
                        <p className="text-sm text-gray-400">JOB TYPE</p>
                        <p className="text-sm text-gray-400">CREATED</p>
                        <p className="text-sm text-gray-400">DEPARTEMENT</p>
                        <p className="text-sm text-gray-400">DEADLINE</p>
                      </div>
                      <div className="grid gap-y-4">
                        <p className="h-[25px]">{data.accession}</p>
                        <p className="h-[25px]">{data.jobtype}</p>
                        <p className="h-[25px]">{data.created}</p>
                        <p className="h-[25px]">{data.departement}</p>
                        <p className="h-[25px]">{data.deadline}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </dl>
    </div>
  );
};

export default Section2Dashboard;
