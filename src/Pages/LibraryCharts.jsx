import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import supabase from '../config/supabaseClient';
import './LibraryCharts.css';
import Layout from '../Components/Layout/layout';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const LibraryCharts = () => {
  const [booksIssuedData, setBooksIssuedData] = useState(null);
  const [fineAnalysisData, setFineAnalysisData] = useState(null);
  const [booksReturnedData, setBooksReturnedData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch books issued data
      const { data: booksIssued } = await supabase
        .from('borrow')
        .select('borrow_date');

      // Fetch fine analysis data
      const { data: fines } = await supabase
        .from('borrow')
        .select('due_date, return_date');

      // Fetch books returned data
      const { data: booksReturned } = await supabase
        .from('borrow')
        .select('return_date');

      // Process data to fit the chart format
      setBooksIssuedData(processBooksIssuedData(booksIssued));
      setFineAnalysisData(processFineAnalysisData(fines));
      setBooksReturnedData(processBooksReturnedData(booksReturned));
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const processBooksIssuedData = (booksIssued) => {
    const labels = getLabels();
    const data = Array(12).fill(0);

    booksIssued.forEach(book => {
      const month = new Date(book.borrow_date).getMonth();
      data[month]++;
    });

    return {
      labels: labels,
      datasets: [{
        label: 'Books Issued',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };
  };

  const processFineAnalysisData = (fines) => {
    const labels = getLabels();
    const data = Array(12).fill(0);

    fines.forEach(fine => {
      if (fine.return_date && new Date(fine.return_date) > new Date(fine.due_date)) {
        const month = new Date(fine.due_date).getMonth();
        const daysLate = Math.ceil((new Date(fine.return_date) - new Date(fine.due_date)) / (1000 * 60 * 60 * 24));
        data[month] += daysLate;
      }
    });

    return {
      labels: labels,
      datasets: [{
        label: 'Fine Analysis',
        data: data,
        backgroundColor: 'rgba(41, 5, 246, 0.6)',
        borderColor: 'rgba(41, 5, 246, 1)',
        borderWidth: 1
      }]
    };
  };

  const processBooksReturnedData = (booksReturned) => {
    const labels = getLabels();
    const data = Array(12).fill(0);

    booksReturned
      .filter(book => book.return_date) // Filter out entries with null return_date
      .forEach(book => {
        const month = new Date(book.return_date).getMonth();
        data[month]++;
      });

    return {
      labels: labels,
      datasets: [{
        label: 'Books Returned',
        data: data,
        backgroundColor: 'rgb(245, 0, 0, 0.6)',
        borderColor: 'rgba(245, 0, 0, 1)',
        borderWidth: 1
      }]
    };
  };

  const getLabels = () => {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  };

  return (
    <Layout>
      <div className='charts-container'>
        {booksIssuedData && (
          <div className='charts'>
            <h2>Books Issued per Month</h2>
            <Bar data={booksIssuedData} />
          </div>
        )}

        {fineAnalysisData && (
          <div className='charts'>
            <h2>Fine Analysis per Month</h2>
            <Bar data={fineAnalysisData} />
          </div>
        )}

        {booksReturnedData && (
          <div className='charts'>
            <h2>Books Returned per Month</h2>
            <Bar data={booksReturnedData} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LibraryCharts;
