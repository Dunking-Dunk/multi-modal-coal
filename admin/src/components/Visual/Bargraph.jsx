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
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['Truck', 'Train', 'Ship'];



export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

export const mileageData = {
  labels,
  datasets: [
    {
      label: 'Mileage',
      data: labels.map(() => faker.datatype.number({ min: 100, max: 500 })),
      backgroundColor: 'rgba(75, 192, 192, 0.5)', // You can change the color as needed
    }
  ],
};
export function Bargraph() {
  return <Bar options={options} data={data} />;
}
