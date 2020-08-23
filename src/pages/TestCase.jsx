import React, { useState, useEffect } from 'react';
import Accordion from '../components/Accordion.jsx';

import { Form, Columns } from 'react-bulma-components';
const { Select } = Form;

const TestCase = (props) => {
  const [microservice, setMicroservice] = useState([]);
  const [testCase, setTestCase] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    fetchTestCase();
    fetchMicroservice();
  }, []);

  const fetchTestCase = async (service = '') => {
    let response = await fetch(
      '/api/testcase?microservice=' + service
    );
    response = await response.json();
    setTestCase(response.data);
  };

  const fetchMicroservice = async () => {
    let response = await fetch('/api/microservice');
    response = await response.json();
    response.data.unshift({name: 'All Microservice'})
    setMicroservice(response.data);
  };

  const renderTestCase = testCase.map((data, index) => (
    <Accordion key={index} title={data.name}>
      <p className="display-linebreak">{data.scenario}</p>
    </Accordion>
  ));

  return (
    <div className="tile is-vertical is-10">
      <div className="tile is-parent">
        <article className="tile is-child notification">
          <p className="title">
            <strong>Test Case List</strong>
          </p>
          <hr style={{ backgroundColor: 'black' }} />
          <Columns>
            <Columns.Column size="two-fifths">
              <Columns>
                <Columns.Column>
                  <Select onChange={event => setSelected(event.target.value)} name="microservice" value={selected}>
                    {microservice.map((data, index) => (
                      <option key={index} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </Select>
                </Columns.Column>
                <Columns.Column>
                  <button
                    className="button is-danger"
                    onClick={event => fetchTestCase(selected)}
                  >
                    Filter
                  </button>
                </Columns.Column>
              </Columns>
            </Columns.Column>
          </Columns>
          {renderTestCase}
        </article>
      </div>
    </div>
  );
};

export default TestCase;
