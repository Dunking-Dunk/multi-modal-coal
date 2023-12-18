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
import {faker} from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Mode wise despatches of raw coal (',
    },
  },
};

const labels = ['Road', 'Rail', 'Inland & Coastal'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Previous Month',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Current Month',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: 'rgba(230, 81, 0, 0.5)',
    }
  ],
};

export function Bargraph() {
  return <Bar options={options} data={data} />;
}
