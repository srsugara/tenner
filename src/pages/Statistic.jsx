import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const Statistic = (props) => {
  const [statistic, setStatistic] = useState({});
  
  useEffect(() => {
    fetchStatistic();
  }, []);

  const fetchStatistic = async () => {
    let options = {
      labels: ['Success', 'Failed'],
      datasets: [
        {
          label: 'Test Diagram',
          backgroundColor: ['#2FDE00', '#B21F00'],
          hoverBackgroundColor: ['#175000', '#501800'],
          data: [],
        },
      ],
    };
    let percentileSuccess, percentileFailed
    let response = await fetch('/api/statistic');
    response = await response.json();
    percentileSuccess = ((response.data.success/(response.data.success + response.data.failed))*100).toFixed(2)
    percentileFailed = ((response.data.failed/(response.data.success + response.data.failed))*100).toFixed(2)
    options.datasets[0].data.push(percentileSuccess, percentileFailed);
    setStatistic(options);
  };

  return (
    <div className="tile is-vertical is-10">
      <div className="tile is-parent">
        <article className="tile is-child notification">
          <p className="title">
            <strong>Test Run Statistic</strong>
          </p>
          <hr style={{ backgroundColor: 'black' }} />
          <Pie
            width={600}
            height={200}
            data={statistic}
            options={{
              title: {
                display: true,
                text: '',
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'bottom',
              },
            }}
          />
        </article>
      </div>
    </div>
  );
};

export default Statistic;
