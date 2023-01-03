/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

// import {faker} from '@faker-js/faker'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


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

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];



export default function MultipleChoice({labels, datas}) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: datas,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return <Bar width={1496} height={748} options={options} data={data} />;
}

MultipleChoice.propTypes = {
  labels: PropTypes.array,
  datas: PropTypes.array
};

MultipleChoice.defaultProps = {
}