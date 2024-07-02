import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LibraryCharts = () => {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const booksIssuedData = {
    labels: labels,
    datasets: [{
      label: 'Books Issued',
      data: [120, 150, 170, 130, 160, 190, 220, 180, 210, 240, 230, 250],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: false,
      borderWidth: 1
    }]
  };

  const fineAnalysisData = {
    labels: labels,
    datasets: [{
      label: 'Fine Analysis',
      data: [300, 400, 350, 320, 450, 480, 500, 450, 470, 520, 530, 550],
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      fill: false,
      borderWidth: 1
    }]
  };

  const booksReturnedData = {
    labels: labels,
    datasets: [{
      label: 'Books Returned',
      data: [110, 140, 160, 120, 150, 180, 210, 170, 200, 230, 220, 240],
      borderColor: 'rgba(255, 159, 64, 1)',
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      fill: false,
      borderWidth: 1
    }]
  };

  return (
    <div>
      <h2>Books Issued per Month</h2>
      <Line data={booksIssuedData} />

      <h2>Fine Analysis per Month</h2>
      <Line data={fineAnalysisData} />

      <h2>Books Returned per Month</h2>
      <Line data={booksReturnedData} />
    </div>
  );
};

export default LibraryCharts;
