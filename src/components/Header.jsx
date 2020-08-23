import React from 'react';

const Header = (props) => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-grey">Test Case Management</h1>
        <h2 className="subtitle has-text-grey">
          A simple application <strong className="has-text-danger">to handle</strong> your test case
        </h2>
      </div>
    </section>
  );
};

export default Header;
