import React, { useState, useEffect, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import AppContext from '../AppContext';
import format from 'date-fns/format';

const { NameContext } = AppContext;
const now = new Date();

const Statistic = (props) => {
  const nameProps = useContext(NameContext);
  const [statistic, setStatistic] = useState({});

  useEffect(() => {
    fetchStatistic();
  }, []);

  const fetchStatistic = async () => {
    let data = {
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
    let percentileSuccess, percentileFailed;
    let response = await fetch('/api/statistic');
    response = await response.json();
    percentileSuccess = (
      (response.data.success / (response.data.success + response.data.failed)) *
      100
    ).toFixed(2);
    percentileFailed = (
      (response.data.failed / (response.data.success + response.data.failed)) *
      100
    ).toFixed(2);
    data.datasets[0].data.push(percentileSuccess, percentileFailed);
    setStatistic(data);
  };

  return (
    <div className="tile is-vertical is-10">
      <div className="tile is-parent">
        <div
          className={
            !props.isReport
              ? 'tile is-child notification'
              : 'tile is-child notification is-white'
          }
        >
          <div id="report" style={{ width: props.width, height: props.height }}>
            <article
              className={
                !props.isReport
                  ? 'tile is-child notification'
                  : 'tile is-child notification is-white'
              }
            >
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
                    fontSize: 10,
                  },
                  legend: {
                    display: true,
                    position: 'bottom',
                  },
                  plugins: {
                    datalabels: {
                      color: 'white',
                      font: {
                        weight: 'bold',
                        size: '20',
                      },
                    },
                  },
                }}
              />
              {props.isReport ? (
                <div
                  className="is-size-7"
                  style={{ marginTop: 70, right: 60, position: 'absolute' }}
                >
                  Jakarta, {format(now, 'd MMMM yyyy')}
                  <br />
                  Penanggung Jawab
                  <br />
                  <br />
                  <br />
                  <br />
                  {nameProps.name || localStorage.getItem('name')}
                </div>
              ) : (
                ''
              )}
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
