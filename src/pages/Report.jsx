import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import logo from '../Horizontal.png';
import { Columns } from 'react-bulma-components';
import format from 'date-fns/format';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Report = (props) => {
  const [startDate, setStartDate] = React.useState();
  const [testRun, setTestRun] = useState([]);
  const now = new Date()

  const fetchTestRun = async () => {
    let response = await fetch(
      `/api/testrun?month=${format(
        startDate,
        'MM'
      )}&year=${format(startDate, 'yyyy')}`
    );
    response = await response.json();
    setTestRun(response.data);
  };

  const pxToMm = (px) => {
    return Math.floor(px / document.getElementById('myMm').offsetHeight);
  };

  const mmToPx = (mm) => {
    return document.getElementById('myMm').offsetHeight * mm;
  };

  const range = (start, end) => {
    return Array(end - start)
      .join(0)
      .split(0)
      .map(function (val, id) {
        return id + start;
      });
  };

  const savePDF = async (event) => {
    const input = document.getElementById('report');
    const inputHeightMm = pxToMm(input.offsetHeight);
    const a4WidthMm = 210;
    const a4HeightMm = 297;
    const a4HeightPx = mmToPx(a4HeightMm);
    const numPages =
      inputHeightMm <= a4HeightMm
        ? 1
        : Math.floor(inputHeightMm / a4HeightMm) + 1;
    console.log({
      input,
      inputHeightMm,
      a4HeightMm,
      a4HeightPx,
      numPages,
      range: range(0, numPages),
      comp: inputHeightMm <= a4HeightMm,
      inputHeightPx: input.offsetHeight,
    });
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    let pdf;
    // Document of a4WidthMm wide and inputHeightMm high
    if (inputHeightMm > a4HeightMm) {
      // elongated a4 (system print dialog will handle page breaks)
      pdf = new jsPDF('p', 'mm', [inputHeightMm + 16, a4WidthMm]);
    } else {
      // standard a4
      pdf = new jsPDF();
    }
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('download.pdf');
  };

  return (
    <div className="tile is-10">
      <div className="tile is-parent">
        <article className="tile is-child notification">
          <p className="title">
            <strong>Generate Report</strong>
          </p>
          <hr style={{ backgroundColor: 'black' }} />
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
          <div id="myMm" style={{ height: '1mm' }}></div>
          <button
            className="button is-warning is-inverted is-outlined is-pulled-right"
            style={{ marginRight: 100 }}
            onClick={savePDF}
          >
            Export to PDF
          </button>
          <div id="report" style={{ width: '210mm', height: '297mm' }}>
            <div
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
                        <td>{data.testCaseName}</td>
                        <td>{data.executedAt.substring(0, 10)}</td>
                        <td>{data.duration}s</td>
                        <td>{data.state}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="is-size-7" style={{ marginTop: 70, right: 40, position: 'absolute' }}>
                  Jakarta, {format(now, 'd MMMM yyyy')}<br/>
                  Penanggung Jawab
                  <br/><br/><br/><br/>
                  Sallis Mahmudah
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Report;
