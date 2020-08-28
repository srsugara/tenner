import React, { useState, useEffect } from 'react';
import { Form, Columns } from 'react-bulma-components';
const { Select } = Form;

const TestRun = (props) => {
  const [microservice, setMicroservice] = useState([]);
  const [testCase, setTestCase] = useState([]);
  const [testRun, setTestRun] = useState([]);
  const [selectedM, setSelectedM] = useState('');
  const [selectedTC, setSelectedTC] = useState('');
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    fetchMicroservice();
    fetchTestRun();
  }, []);

  const fetchTestCase = async (service) => {
    try {
      let response = await fetch('/api/testcase?microservice=' + service);
      response = await response.json();
      if (response.data.length > 0) {
        response.data.unshift({
          name: 'All',
          microservice: service,
          file: '',
        });
        setIsDisable(false)
      } else {
        setIsDisable(true)
      }
      setTestCase(response.data);
    } catch (err) {
      alert(err);
    }
  };

  const fetchMicroservice = async () => {
    try {
      let response = await fetch('/api/microservice');
      response = await response.json();
      setMicroservice(response.data);
      await filterTestCase(response.data[0].name);
    } catch (err) {
      alert(err);
    }
  };

  const fetchTestRun = async () => {
    let response = await fetch('/api/testrun');
    response = await response.json();
    setTestRun(response.data);
  };

  const excuteTestCase = async () => {
    try {
      await fetch('/api/testrun', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          microservice: selectedM,
          feature: selectedTC,
        }),
      });
      await fetchTestRun();
    } catch (err) {
      alert(err);
    }
  };

  const filterTestCase = async (service) => {
    await fetchTestCase(service);
    setSelectedM(service);
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
                    {testCase.map((data, index) => (
                      <option key={index} value={data.file}>
                        {data.name}
                      </option>
                    ))}
                  </Select>
                </Columns.Column>
                <Columns.Column>
                  <button disabled={isDisable} className="button is-danger" onClick={excuteTestCase}>
                    Execute
                  </button>
                </Columns.Column>
              </Columns>
            </Columns.Column>
            <Columns.Column>
              <button
                className="button is-small is-primary is-rounded is-pulled-right"
                onClick={fetchTestRun}
              >
                <span className="icon">
                  <i className="fas fa-sync-alt"></i>
                </span>
                <span>Refresh</span>
              </button>
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
                  <td>{data.feature}</td>
                  <td>{data.executedAt.substring(0, 10)}</td>
                  <td>{data.totalScenario}</td>
                  <td>{data.duration}s</td>
                  <td className="control has-icons-right">
                    {data.state}
                    <span className="has-text-info is-pulled-right">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`http://localhost:9090/copy${data._id.$oid}/index.html`}
                      >
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
