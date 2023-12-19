import React from 'react';
import { Line } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';



export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: '2023',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '2022',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function Linegraph() {
  return <Line options={options} data={data} />;
}
