import React from 'react';
import { Pie } from 'react-chartjs-2';

const Statistic = (props) => {
  let state = {
    labels: ['Success', 'Failed', 'Skipped'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: ['#B21F00', '#2FDE00', '#6800B4'],
        hoverBackgroundColor: ['#501800', '#175000', '#35014F'],
        data: [60, 25, 15],
      },
    ],
  };

  return (
    <div className="tile is-vertical is-10">
      <div className="tile is-parent">
        <article className="tile is-child notification is-warning">
          <p className="title">
            <strong>Test Dashboard</strong>
          </p>
          <Pie
            data={state}
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
