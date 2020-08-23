import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameRegis, setNameRegis] = useState('');
  const [emailRegis, setEmailRegis] = useState('');
  const [passRegis, setPassRegis] = useState('');

  const submitRegister = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameRegis,
          email: emailRegis,
          password: passRegis,
        }),
      });
      response = await response.json();
    } catch (err) {
      alert(err)
    }
    alert('Register success, you can login now')
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    let response = await fetch(
      `/api/login?email=${email}&password=${password}`
    );
    response = await response.json();
    response = response.data;
    if (!response) {
      alert('Email or password not found');
      return;
    }
    if (email !== response.email) {
      alert('Email or password invalid');
      return;
    }
    return history.push('/home/statistic');
  };

  return (
    <div>
      <section className="hero is-medium is-light is-bold">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <article className="card" style={{ marginRight: 50 }}>
                <br />
                <center>
                  <h1 className="has-text-grey is-family-primary is-size-3">
                    Login
                  </h1>
                </center>
                <hr />
                <div className="card-content">
                  <p className="control has-icons-left">
                    <input
                      className="input is-danger without-radius"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="email"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                  <br />
                  <p className="control has-icons-left">
                    <input
                      className="input is-danger without-radius"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="password"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                  <br />
                  <p className="control">
                    <button
                      className="button is-danger is-fullwidth without-radius"
                      onClick={submitLogin}
                    >
                      Login
                    </button>
                  </p>
                </div>
              </article>
              <article className="card" style={{ backgroundColor: '#ff1493' }}>
                <br />
                <center>
                  <h1 className="has-text-white is-family-primary is-size-3">
                    Register
                  </h1>
                </center>
                <div className="card-content">
                  <p className="control has-icons-left">
                    <input
                      className="input is-light without-radius"
                      type="text"
                      value={nameRegis}
                      onChange={(event) => setNameRegis(event.target.value)}
                      placeholder="full name"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user"></i>
                    </span>
                  </p>
                  <br />
                  <p className="control has-icons-left">
                    <input
                      className="input is-light without-radius"
                      type="email"
                      value={emailRegis}
                      onChange={(event) => setEmailRegis(event.target.value)}
                      placeholder="email"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                  <br />
                  <p className="control has-icons-left">
                    <input
                      className="input is-light without-radius"
                      type="password"
                      value={passRegis}
                      onChange={(event) => setPassRegis(event.target.value)}
                      placeholder="password"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                  <br />
                  <p className="control has-background-light">
                    <button
                      className="button is-fullwidth without-radius has-text-danger"
                      onClick={submitRegister}
                    >
                      Register
                    </button>
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
