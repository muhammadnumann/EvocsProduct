import { ArrowSmallDownIcon } from '@heroicons/react/24/outline';

import LargeCard from 'src/components/Cards/LargeCard/LargeCard';
import MiniCard from 'src/components/Cards/miniCard/MiniCard';
import DoughnutChart from 'src/components/DashboardComponents/Charts/DoughnutChart';

import LineChart from '../Charts/LineChart';

const jobs = [
  {
    id: 1,
    name: 'John Williams',
    title: 'Marketing Analyst',
    rank: '#4',
    status: 'Days to Deadline',
    timer: '1',
  },
  {
    id: 2,
    name: 'Tom Jerry',
    title: 'Head of Security',
    rank: '#4',
    status: 'Days to Deadline',
    timer: '3',
  },
  {
    id: 3,
    name: 'Mary Johnson',
    title: 'Software Engineer',
    rank: '#4',
    status: 'Days to Deadline',
    timer: '5',
  },
  {
    id: 5,
    name: 'Michael Kim',
    title: 'Sales Executive',
    rank: '#4',
    status: 'Days to Deadline',
    timer: '7',
  },
  {
    id: 6,
    name: 'David Patel',
    title: 'HR Generalist',
    rank: '#4',
    status: 'Days to Deadline',
    timer: '7',
  },
  {
    id: 7,
    name: 'Archibald Vindaswamy',
    title: 'Sales Manager',
    rank: '#4',
    status: 'Days to Deadline',
    timer: '10',
  },
  {
    id: 8,
    name: 'John Williamson',
    title: 'Sales Manager',
    rank: '#4',
    status: 'Days to Deadline',
    timer: '12',
  },
];
const candidates = [
  {
    id: 1,
    name: 'John Williamson',
    title: 'Sales Manager',
    rank: '#4',
    source: 'LinkedIn Jobs',
    timer: '2 min ago',
  },
  {
    id: 2,
    name: 'John Williamson',
    title: 'Sales Manager',
    rank: '#4',
    source: 'LinkedIn Jobs',
    timer: '1 min ago',
  },
  {
    id: 3,
    name: 'John Williamson',
    title: 'Sales Manager',
    rank: '#4',
    source: 'LinkedIn Jobs',
    timer: '5 min ago',
  },
  {
    id: 5,
    name: 'John Williamson',
    title: 'Sales Manager',
    rank: '#4',
    source: 'LinkedIn Jobs',
    timer: '2 min ago',
  },
  {
    id: 6,
    name: 'John Williamson',
    title: 'Sales Manager',
    rank: '#4',
    source: 'LinkedIn Jobs',
    timer: '1 min ago',
  },
  {
    id: 7,
    name: 'John Williamson',
    title: 'Sales Manager',
    rank: '#4',
    source: 'LinkedIn Jobs',
    timer: '5 min ago',
  },
];

const Interviews = [
  {
    id: 1,
    interviewType: 'Phone screening',
    name: 'John Williamson',
    position: 'Sales Manager',
    number: '#158-32',
    date: 'April 8th',
    year: '2023',
    timer: '10:00pm to 10:30pm',
  },
  {
    id: 2,
    interviewType: 'Phone screening',
    name: 'Tom Ding',
    position: 'Marketing Analyst',
    number: '#158-32',
    date: 'April 13th',
    year: '2023',
    timer: '11:00pm to 12:00pm',
  },
  {
    id: 3,
    interviewType: 'Phone screening',
    name: 'Sean Brody',
    position: 'Workday Consultant',
    number: '#158-32',
    date: 'April 15th',
    year: '2023',
    timer: '09:00pm to 09:30pm',
  },
  {
    id: 5,
    interviewType: 'Phone screening',
    name: 'Jane Williams',
    position: 'Executive Assistant',
    number: '#158-32',
    date: 'April 19th',
    year: '2023',
    timer: '11:00pm to 12:30pm',
  },
  {
    id: 6,
    interviewType: 'Phone screening',
    name: 'William Jameson',
    position: 'Chief Drinking Officer',
    number: '#158-32',
    date: 'April 22nd',
    year: '2023',
    timer: '11:00pm to 12:30pm',
  },
];
const Tasks = [
  {
    id: 1,
    tasktype: 'Evaluate',
    interviewType: '2nd interview',
    name: 'Kat Williamson',
    position: 'Sales Manager',
    number: '#15832',
    due: true,
    timeleft: 'Due 2 days ago',
  },
  {
    id: 2,
    tasktype: 'Evaluate',
    interviewType: '2nd interview',
    name: 'Bat Woman',
    position: 'Procurement Specialist',
    number: '#12332',
    due: false,
    timeleft: 'Due in 2 days',
  },
  {
    id: 3,
    tasktype: 'Form',
    interviewType: '2nd interview',
    name: 'Clark Cant',
    position: 'Director of Hygiene',
    number: '#12922',
    due: false,
    timeleft: 'Due in 2 days',
  },
  {
    id: 5,
    tasktype: 'Evaluate',
    interviewType: 'Phone Interview',
    name: 'John Jon',
    position: 'Sales Manager',
    number: '#19302',
    due: true,
    timeleft: 'Due 1 day ago',
  },
  {
    id: 6,
    tasktype: 'Form',
    interviewType: 'Phone Interview',
    name: 'John Williamson',
    position: 'Sales Manager',
    number: '#158-32',
    due: false,
    timeleft: 'No Due Date',
  },
];
const Section1Dashboard = () => {
  return (
    <div>
      <h3 className="mt-7 text-lg font-medium leading-6 text-gray-900">
        This Year Stats
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <MiniCard cardname="Interview Pipeline Size">
          <p className="pb-5 text-6xl font-bold text-[#3196fa]">223</p>
        </MiniCard>
        <MiniCard cardname="Jobs">
          <p className="pb-1 text-5xl font-bold text-[#64c84a]">79</p>
          <div className="flex justify-center gap-x-1 pb-3">
            <p className="font-sm font-bold ">17.9%</p>
            <ArrowSmallDownIcon
              className="h-5 w-5 flex-shrink-0 self-center text-red-500"
              aria-hidden="true"
            />
            <p className="text-gray-500">this year</p>
          </div>
        </MiniCard>
        <DoughnutChart />
        <MiniCard cardname="Candidates">
          <p className="pb-7 text-6xl font-bold text-red-600 text-[#f54b4b]">
            25
          </p>
        </MiniCard>
        <LineChart />
      </dl>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-2">
        <LargeCard cardname="Jobs" count="7">
          {jobs.map((data, index) => {
            return (
              <div
                key={index}
                className=" grid grid-cols-3 gap-4 pb-5 font-semibold"
              >
                <div className="col-span-2 text-left">
                  <p className="text-md  text-gray-900">
                    {data.name} <span>{data.rank}</span>
                  </p>
                  <p className="text-sm">
                    {data.title} . <span>{data.status}</span>
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <p className="flex items-center justify-center rounded-2xl border-2 border-[#2f95fa] px-1 text-sm text-[#2f95fa]">
                    {data.timer}
                  </p>
                  <p className="w-2/3 text-sm text-gray-500">{data.status}</p>
                </div>
              </div>
            );
          })}
        </LargeCard>
        <LargeCard cardname="Candidates" count="7">
          {candidates.map((data, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between pb-5 font-semibold"
              >
                <div className="flex items-center gap-x-3 text-left">
                  <div className="flex h-[50px] w-[50px] items-center justify-center  rounded-full bg-[#ddeeff] text-[#386592] ">
                    {data.id}
                  </div>
                  <div>
                    <p className="text-md text-gray-900">
                      {data.name} <span>{data.rank}</span>
                    </p>
                    <p className="text-sm">
                      {data.title} . <span>{data.source}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{data.timer}</p>
                </div>
              </div>
            );
          })}
        </LargeCard>
      </dl>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-2">
        <LargeCard cardname="Interviews" count="7">
          {Interviews.map((data, index) => {
            return (
              <div key={index} className="pb-5 font-semibold">
                <div className="flex items-center gap-x-3 text-left">
                  <div className="flex h-[50px] w-[160px] items-center justify-center  rounded-xl border-2  border-[#2f95fa] bg-[#ddeeff] text-[#386592] ">
                    {data.date}
                  </div>
                  <div>
                    <p className="text-md text-gray-900">
                      {data.interviewType} {data.name}, {data.position}
                    </p>
                    <p className="text-sm">
                      {data.date}, {data.year} at {data.timer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </LargeCard>
        <LargeCard cardname="Tasks" count="8">
          {Tasks.map((data, index) => {
            return (
              <div key={index} className="pb-5 font-semibold">
                <div className="flex items-center gap-x-3 text-left">
                  <div
                    className={`flex h-[30px] w-[30px] rounded-full  border-2 ${
                      data.due ? 'border-red-500' : 'border-gray-200'
                    }`}
                  ></div>
                  <div>
                    <p className="text-md text-gray-900">
                      {data.tasktype} : {data.interviewType} - {data.name} ({' '}
                      {data.position} {data.number} )
                    </p>
                    <p className="text-sm">
                      <span className={`${data.due ? 'text-red-500' : ''}`}>
                        {data.timeleft}
                      </span>{' '}
                      - {data.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </LargeCard>
      </dl>
    </div>
  );
};

export default Section1Dashboard;
