import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  scales: {
    y: {
      display: false,
      stacked: true,
    },
    x: {
      stacked: true,
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const labels = [''];

export const data = {
  labels,
  datasets: [
    {
      label: '',
      backgroundColor: '#4FD1C5',
      borderWidth: 0,
      borderRadius: 5,
    },
    {
      label: '',
      backgroundColor: '#f5f5f9',
      borderWidth: 0,
      borderRadius: 5,
    },
  ],
};

export function ProgressBar() {
  return <Bar options={options} data={data} className="Barchart" />;
}
