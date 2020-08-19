import React from 'react';
import Accordion from '../components/Accordion.jsx';

const TestCase = (props) => {
  return (
    <div className="tile is-vertical is-10">
      <div className="tile is-parent">
        <article className="tile is-child notification is-warning">
          <p className="title">
            <strong>Test Case List</strong>
          </p>
          <Accordion title="Example title">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              nec iaculis mauris.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              nec iaculis mauris.
            </p>
          </Accordion>
          <Accordion title="Example title 2">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              nec iaculis mauris.
            </p>
          </Accordion>
        </article>
      </div>
    </div>
  );
};

export default TestCase;
