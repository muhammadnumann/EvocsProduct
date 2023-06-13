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
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['Red', 'Green', 'Yellow'],

  datasets: [
    {
      circumference: 180,
      rotation: -90,
      data: [300, 50, 100],
      backgroundColor: ['#3196fa', '#DC2626', '#64c84a'],
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
const DoughnutChart = () => {
  return (
    <div className=" rounded-lg bg-white shadow ">
      <div className="bg-gray-50 px-4 py-4">
        <div className="text-center text-sm">
          <div className="font-medium text-gray-600 hover:text-gray-500 ">
            Job status
            <span className="sr-only"> stats</span>
          </div>
        </div>
      </div>
      <div className="flex  h-[120px] justify-center">
        <Doughnut data={data} width={800} height={800} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
