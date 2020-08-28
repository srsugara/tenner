import React, { useState, useEffect, useContext } from 'react';
import Accordion from '../components/Accordion.jsx';
import { Form, Columns } from 'react-bulma-components';
import AppContext from '../AppContext';
import format from 'date-fns/format';

const { NameContext } = AppContext;
const { Select } = Form;
const now = new Date();

const TestCase = (props) => {
  const nameProps = useContext(NameContext);
  const [microservice, setMicroservice] = useState([]);
  const [testCase, setTestCase] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    fetchTestCase();
    fetchMicroservice();
  }, []);

  const fetchTestCase = async (service = '') => {
    service = service === 'All Microservice' ? '' : service
    let response = await fetch('/api/testcase?microservice=' + service);
    response = await response.json();
    setTestCase(response.data);
  };

  const fetchMicroservice = async () => {
    let response = await fetch('/api/microservice');
    response = await response.json();
    response.data.unshift({ name: 'All Microservice' });
    setMicroservice(response.data);
  };

  const renderTestCase = testCase.map((data, index) =>
    !props.isReport ? (
      <Accordion key={index} title={data.name}>
        <p className="display-linebreak">{data.scenario}</p>
      </Accordion>
    ) : (
      <div key={index} className="container" style={{ paddingLeft: 10 }}>
        <p className="has-text-left">
          <strong>
            {index + 1}. {data.name}
          </strong>
        </p>
        <p className="display-linebreak" style={{ paddingLeft: 20 }}>
          {data.scenario}
        </p>
        <br />
      </div>
    )
  );

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
                <strong>Test Case List</strong>
              </p>
              <hr style={{ backgroundColor: 'black' }} />
              {!props.isReport ? (
                <Columns>
                  <Columns.Column size="two-fifths">
                    <Columns>
                      <Columns.Column>
                        <Select
                          onChange={(event) => setSelected(event.target.value)}
                          name="microservice"
                          value={selected}
                        >
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
                          onClick={(event) => fetchTestCase(selected)}
                        >
                          Filter
                        </button>
                      </Columns.Column>
                    </Columns>
                  </Columns.Column>
                </Columns>
              ) : (
                ''
              )}
              {renderTestCase}
              {props.isReport ? (
                <div
                  className="is-size-7"
                  style={{ marginTop: 50, right: 60, position: 'absolute' }}
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

export default TestCase;
