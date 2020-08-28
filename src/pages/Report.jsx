import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import logo from '../Horizontal.png';
import { Columns } from 'react-bulma-components';
import format from 'date-fns/format';
import AppContext from '../AppContext';
import savePDF from '../helper/PDFConverter';
import Statistic from './Statistic';
import TestCase from './TestCase';

const { NameContext } = AppContext;
const now = new Date();

const Report = (props) => {
  const nameProps = useContext(NameContext);
  const [startDate, setStartDate] = React.useState();
  const [testRun, setTestRun] = useState([]);
  const [reportType, setReportType] = useState('monthly');

  const fetchTestRun = async () => {
    let response = await fetch(
      `/api/testrun?month=${format(startDate, 'MM')}&year=${format(
        startDate,
        'yyyy'
      )}`
    );
    response = await response.json();
    setTestRun(response.data);
  };

  const Monthly = () => (
    <div className="tile is-vertical is-10">
      <div className="tile is-parent">
        <div id="report" style={{ width: '210mm', height: '297mm' }}>
          <article
            className="tile is-child notification is-white"
            style={{ height: '100%' }}
          >
            <div className="content">
              <img
                className="is-pulled-left"
                style={{ height: '45px' }}
                src={logo}
                alt="Bukalapak Logo"
              />
              <p
                className="has-text-left"
                style={{
                  fontSize: '0.55rem',
                  paddingLeft: '12rem',
                  paddingTop: '0.8rem',
                }}
              >
                Gedung Metropolitan Tower, Jl. R.A.Kartini Jl. TB Simatupang
                No.Kav.14, RT.10/RW.4, Cilandak Bar., Kec. Cilandak, Kota
                Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430
              </p>
              <hr />
              {startDate ? (
                <p>
                  Laporan Pengujian Otomatis
                  <br />
                  Periode {format(startDate, 'MMMM yyyy')}
                </p>
              ) : (
                ''
              )}
              <br />
              <table className="table is-size-7">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Feature</th>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {testRun.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.feature}</td>
                      <td>{data.executedAt.substring(0, 10)}</td>
                      <td>{data.duration}s</td>
                      <td>{data.state}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            </div>
          </article>
        </div>
      </div>
    </div>
  );

  return (
    <div className="tile is-10">
      <div className="tile is-parent">
        <article className="tile is-child notification">
          <p className="title">
            <strong>Generate Report</strong>
          </p>
          <div className="tabs is-centered">
            <ul>
              <li className={reportType === 'monthly' ? 'is-active' : ''}>
                <a
                  href={() => false}
                  onClick={(event) => setReportType('monthly')}
                  style={{ textDecoration: 'none' }}
                >
                  Monthly
                </a>
              </li>
              <li className={reportType === 'statistic' ? 'is-active' : ''}>
                <a
                  href={() => false}
                  onClick={(event) => setReportType('statistic')}
                  style={{ textDecoration: 'none' }}
                >
                  Statistic
                </a>
              </li>
              <li className={reportType === 'testcase' ? 'is-active' : ''}>
                <a
                  href={() => false}
                  onClick={(event) => setReportType('testcase')}
                  style={{ textDecoration: 'none' }}
                >
                  Test Case
                </a>
              </li>
            </ul>
          </div>
          {reportType === 'monthly' ? (
            <Columns>
              <Columns.Column size="two-fifths">
                <Columns>
                  <Columns.Column>
                    <div className="customDatePickerWidth">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                      />
                    </div>
                  </Columns.Column>
                  <Columns.Column>
                    <button className="button is-danger" onClick={fetchTestRun}>
                      Preview
                    </button>
                  </Columns.Column>
                </Columns>
              </Columns.Column>
            </Columns>
          ) : (
            ''
          )}
          <button
            className="button is-warning is-inverted is-outlined is-pulled-right"
            style={{ marginRight: 100 }}
            onClick={() => savePDF(362)}
          >
            Export to PDF
          </button>
          <div id="myMm" style={{ height: '1mm' }}></div>
          {reportType === 'monthly' ? (
            <Monthly />
          ) : reportType === 'statistic' ? (
            <Statistic isReport={true} width="210mm" height="297mm" />
          ) : (
            <TestCase isReport={true} width="210mm" height="297mm" />
          )}
        </article>
      </div>
    </div>
  );
};

export default Report;
