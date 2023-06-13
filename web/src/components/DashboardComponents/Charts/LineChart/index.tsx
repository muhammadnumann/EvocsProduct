import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);
import { Line } from 'react-chartjs-2';

const data = {
  labels: [
    'Moday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  datasets: [
    {
      fill: true,
      backgroundColor: 'rgb(229, 231, 235)',
      lineTension: 0.6,
      borderColor: '#DC2626',
      pointRadius: [0, 2, 2, 2, 2, 2],
      pointBackgroundColor: '#FFF',
      pointBorderWidth: 4,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#DC2626',
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointHitRadius: 5,
      data: [50, 51, 50, 53, 50, 52, 54],
    },
  ],
};
const option = {
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
      showLine: false,
    },
  },
  legend: { display: false },
  responsive: true,
  scales: {
    y: {
      stacked: true,
      display: false,
      axis: {
        ticks: {
          min: -20,
          max: 140,
        },
      },
    },
    x: {
      stacked: true,
      display: false,
      grid: {
        display: false,
        borderWidth: 0,
      },
      axis: {
        display: false,
      },
    },
  },
};
const LineChart = () => (
  <div className=" rounded-lg bg-white shadow ">
    <div className="bg-gray-50 px-4 py-4">
      <div className="text-center text-sm">
        <div className="font-medium text-gray-600 hover:text-gray-500 ">
          Applied Last 7 days
          <span className="sr-only"> stats</span>
        </div>
      </div>
    </div>
    <div className="flex  h-[120px] justify-center p-3">
      <Line data={data} width={400} height={200} options={option} />
    </div>
  </div>
);
export default LineChart;
