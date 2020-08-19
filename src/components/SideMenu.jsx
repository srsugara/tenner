import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = (props) => {
  return (
    <div className="tile is-parent is-2">
      <article className="tile is-child notification is-black">
        <div className="content">
          <p className="title">Menu</p>
          <div className="tile is-vertical is-parent">
            <Link
              className="button is-warning is-outlined"
              to="/home/statistic"
              style={{ textDecoration: 'none' }}
            >
              Statistic
            </Link>
            <br />
            <Link
              className="button is-warning is-outlined"
              to="/home/test-case"
              style={{ textDecoration: 'none' }}
            >
              Test Case
            </Link>
            <br />
            <Link
              className="button is-warning is-outlined"
              to="/home/test-run"
              style={{ textDecoration: 'none' }}
            >
              Test Run
            </Link>
            <br />
            <Link
              className="button is-warning is-outlined"
              to="/home/report"
              style={{ textDecoration: 'none' }}
            >
              Report
            </Link>
            <br />
            <br />
            <Link
              className="button is-danger is-outlined"
              to="/login"
              style={{ textDecoration: 'none' }}
            >
              Logout
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default SideMenu;
