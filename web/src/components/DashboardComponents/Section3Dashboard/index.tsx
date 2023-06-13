// import { ArrowSmallUpIcon } from '@heroicons/react/24/outline';
import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
ChartJS.register(CategoryScale, Title, Tooltip, Legend, ArcElement);
import { Doughnut, Line } from 'react-chartjs-2';

const data = {
  labels: ['Red', 'Green', 'Yellow'],
  datasets: [
    {
      circumference: 380,
      rotation: 0,
      data: [100, 50, 100],
      backgroundColor: ['#4F7228', '#9CA3AF', '#F54B4B'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};
const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

const linechartdata = {
  labels: ['19 dec', '20 dec', '21 dec', '22 dec'],
  datasets: [
    {
      fill: false,
      lineTension: 0.6,
      borderColor: '#9CA3AF',
      pointRadius: [0, 4, 4, 0],
      pointBackgroundColor: '#FFF',
      pointBorderWidth: 2,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#9CA3AF',
      pointHoverBackgroundColor: '#9CA3AF',
      pointHoverBorderColor: '#9CA3AF',
      pointHoverBorderWidth: 1,
      pointHitRadius: 2,
      data: [48, 48, 48, 48],
    },
  ],
};
const linechartoption = {
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    chartAreaBorder: {
      borderColor: 'red',
      borderWidth: 2,
      borderDash: [5, 5],
      borderDashOffset: 2,
    },
  },
  element: {
    point: {
      pointBackgroundColor: '#000',
    },
    line: {
      showLine: true,
    },
  },
  legend: { display: false },
  responsive: true,
  scales: {
    y: {
      axis: {
        ticks: {
          min: -20,
          max: 140,
        },
      },
    },
    x: {
      grid: {
        display: false,
        borderWidth: 0,
      },
      axis: {
        display: true,
      },
    },
  },
};
const Section3Dashboard = () => {
  return (
    <div>
      <h3 className="mt-10 text-lg font-medium leading-6 text-gray-900">
        Engagement Overviews
      </h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-12">
        <div className="col-start-1 col-end-13 rounded-lg bg-white shadow lg:col-start-1  lg:col-end-10  ">
          <div className="grid grid-cols-8 divide-x-2">
            <div className="col-start-1 col-end-6 px-4 pt-5 pb-5 sm:px-6 sm:pt-6">
              <div className="text-md mb-3 flex items-center justify-between font-semibold text-black">
                <p>Engagement score</p>
                <p>Outcomes</p>
              </div>
              <div className="justify-left flex items-center gap-6 pb-12">
                <div>
                  <div className="pr-8 text-8xl font-bold text-[#4d7228]">
                    7.4
                  </div>
                </div>
                <div>
                  <p>0.7 below</p>
                  <p>
                    True Benchmark{' '}
                    <span className="rounded-md bg-gray-300 px-2 font-semibold">
                      8.1
                    </span>
                  </p>
                  <p>Room for improvement</p>

                  <p>
                    In the <u>bottom 25%</u> of Technology
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-md mb-3 font-semibold text-black">
                  eNPS Distribution:
                </h3>
                <div className="flex gap-4">
                  <div className="mt-5 h-[20px] w-[20px]">
                    <Doughnut
                      data={data}
                      width={1000}
                      height={1000}
                      options={options}
                    />
                  </div>
                  <div className="flex items-center gap-8 font-semibold text-gray-400">
                    <div>
                      <p className="text-[#4d7228]">42%</p>
                      <p className="text-sm">Promoters (324)</p>
                    </div>
                    <div>
                      <p className="text-gray-400">32%</p>
                      <p className="text-sm">Passives (241)</p>
                    </div>
                    <div>
                      <p className="text-[#f54b4b]">42%</p>
                      <p className="text-sm">Detractors (196)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-start-6 col-end-9 px-4 pt-5 pb-5 sm:px-6 sm:pt-6">
              <div className="text-md mb-3 flex items-center justify-between font-semibold text-black">
                <p>Score overtime</p>
                <p>Expand</p>
              </div>
              <p>
                <span className="mr-2 rounded-full bg-gray-300 px-2 font-semibold">
                  -
                </span>
                No Change since 2 Jan
              </p>
              <div className="flex justify-center pt-12">
                <Line
                  data={linechartdata}
                  width={400}
                  height={200}
                  options={linechartoption}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-start-1 col-end-13 rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6 lg:col-start-10 lg:col-end-13">
          <div>
            <div className="text-md mb-3 flex items-center justify-between font-semibold text-black">
              <p>Participation</p>
              <p>Expand</p>
            </div>
            <p>93% aggregated participation rate</p>
            <p>3 percentage points above benchmark (90%)</p>
          </div>
          <div>
            <p>Engagement score</p>
            <p>
              The overall score is based on responses from 761 employees (out of
              828 employees who recieved the survey)
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-black">
              Aggregate score accuracy
            </p>
            <u className="text-lg text-[#4F7228]">High</u>
          </div>
        </div>
      </dl>
    </div>
  );
};

export default Section3Dashboard;
