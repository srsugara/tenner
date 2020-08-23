import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bulma-components';
import profil from '../user.png';

const SideMenu = (props) => {
  const username = 'Salis Mahmudah';
  return (
    <div className="tile is-parent is-2">
      <article className="tile is-child notification is-black">
        <div className="content">
          <p className="title has-text-light">Menu</p>
          <img
            style={{ height: '90px' }}
            src={profil}
            alt="Bulma: a modern CSS framework based on Flexbox"
          />
          <Dropdown color="black" label={username}>
            <Dropdown.Item value="">
              <Link
                className="button is-danger is-fullwidth"
                to="/"
                style={{ textDecoration: 'none' }}
              >
                Logout
              </Link>
            </Dropdown.Item>
          </Dropdown>
          <div className="tile is-vertical is-parent">
            <Link
              className="button is-danger is-outlined"
              to="/home/statistic"
              style={{ textDecoration: 'none' }}
            >
              Statistic
            </Link>
            <br />
            <Link
              className="button is-danger is-outlined"
              to="/home/test-case"
              style={{ textDecoration: 'none' }}
            >
              Test Case
            </Link>
            <br />
            <Link
              className="button is-danger is-outlined"
              to="/home/test-run"
              style={{ textDecoration: 'none' }}
            >
              Test Run
            </Link>
            <br />
            <Link
              className="button is-danger is-outlined"
              to="/home/report"
              style={{ textDecoration: 'none' }}
            >
              Report
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default SideMenu;
