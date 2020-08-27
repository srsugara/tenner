import React, { useState, useEffect } from 'react';
import { Form, Columns } from 'react-bulma-components';
const { Select } = Form;

const TestRun = (props) => {
  const [microservice, setMicroservice] = useState([]);
  const [testCase, setTestCase] = useState([]);
  const [testRun, setTestRun] = useState([]);
  const [selectedM, setSelectedM] = useState('');
  const [selectedTC, setSelectedTC] = useState('');

  useEffect(() => {
    fetchMicroservice();
    fetchTestRun();
  }, []);

  const fetchTestCase = async (service = '') => {
    if (service !== '') {
      let response = await fetch('/api/testcase?microservice=' + service);
      response = await response.json();
      setTestCase(response.data);
    }
  };

  const fetchMicroservice = async () => {
    let response = await fetch('/api/microservice');
    response = await response.json();
    setMicroservice(response.data);
    await filterTestCase(response.data[0].name);
  };

  const fetchTestRun = async () => {
    let response = await fetch('/api/testrun');
    response = await response.json();
    setTestRun(response.data);
  };

  const filterTestCase = async (service) => {
    await fetchTestCase(service);
    setSelectedM(service);
  };

  const openExternalReport = (folderTarget) => {
    console.log('test');
    // window.location.href = `/copy${folderTarget}/index.html`
  };

  return (
    <div className="tile is-vertical is-10">
      <div className="tile is-parent">
        <article className="tile is-child notification">
          <p className="title">
            <strong>Test Run List</strong>
          </p>
          <hr style={{ backgroundColor: 'black' }} />
          <Columns>
            <Columns.Column size="two-thirds">
              <Columns>
                <Columns.Column>
                  <Select
                    onChange={(event) => filterTestCase(event.target.value)}
                    name="microservice"
                    value={selectedM}
                  >
                    <option disabled>Select Microservice</option>
                    {microservice.map((data, index) => (
                      <option key={index} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </Select>
                </Columns.Column>
                <Columns.Column>
                  <Select
                    onChange={(event) => setSelectedTC(event.target.value)}
                    name="testcase"
                    value={selectedTC}
                  >
                    <option disabled>Select Test Case</option>
                    {testCase.map((data, index) => (
                      <option key={index} value={data.file}>
                        {data.name}
                      </option>
                    ))}
                  </Select>
                </Columns.Column>
                <Columns.Column>
                  <button className="button is-danger">Execute</button>
                </Columns.Column>
              </Columns>
            </Columns.Column>
          </Columns>
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Date</th>
                <th>Test Scenario</th>
                <th>Duration</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {testRun.map((data, index) => (
                <tr key={index}>
                  <td>{data.testCaseName}</td>
                  <td>{data.executedAt.substring(0, 10)}</td>
                  <td>{data.totalScenario}</td>
                  <td>{data.duration}s</td>
                  <td className="control has-icons-right">
                    {data.state}
                    <span className="has-text-info is-pulled-right">
                      <a target="_blank" rel="noopener noreferrer" href={`http://localhost:9090/copy${data._id.$oid}/index.html`}>
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </div>
    </div>
  );
};

export default TestRun;
