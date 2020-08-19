import React from 'react';

const TestRun = (props) => {
  return (
    <div className="tile is-vertical is-10">
      <div className="tile is-parent">
        <article className="tile is-child notification is-warning">
          <p className="title">
            <strong>Test Run List</strong>
          </p>
          <table className="table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Date</th>
                <th>Duration</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lorem ipsum - cell A1</td>
                <td>Lorem ipsum - cell B1</td>
                <td>Lorem ipsum - cell C1</td>
                <td>Lorem ipsum - cell D1</td>
              </tr>
              <tr>
                <td>Lorem ipsum - cell A2</td>
                <td>Lorem ipsum - cell B2</td>
                <td>Lorem ipsum - cell C2</td>
                <td>Lorem ipsum - cell D2</td>
              </tr>
              <tr>
                <td>Lorem ipsum - cell A3</td>
                <td>Lorem ipsum - cell B3</td>
                <td>Lorem ipsum - cell C3</td>
                <td>Lorem ipsum - cell D3</td>
              </tr>
              <tr>
                <td>Lorem ipsum - cell A4</td>
                <td>Lorem ipsum - cell B4</td>
                <td>Lorem ipsum - cell C4</td>
                <td>Lorem ipsum - cell D4</td>
              </tr>
              <tr>
                <td>Lorem ipsum - cell A5</td>
                <td>Lorem ipsum - cell B5</td>
                <td>Lorem ipsum - cell C5</td>
                <td>Lorem ipsum - cell D5</td>
              </tr>
              <tr>
                <td>Lorem ipsum - cell A6</td>
                <td>Lorem ipsum - cell B6</td>
                <td>Lorem ipsum - cell C6</td>
                <td>Lorem ipsum - cell D6</td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>
  );
};

export default TestRun;
