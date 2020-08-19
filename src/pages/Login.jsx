import React from 'react';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
  const history = useHistory();

  const [state, setState] = React.useState({
    email: '',
    password: '',
  });

  const setInputEmail = (event) => {
    setState({
      ...state,
      email: (event.target.value || '').trim(),
    });
  };

  const setInputPassword = (event) => {
    setState({
      ...state,
      password: event.target.value,
    });
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!state.email) {
      alert('Use your @gmail.com account');
      return;
    }
    if (!state.email.endsWith('@gmail.com')) {
      alert('Use your @gmail.com account');
      return;
    }

    return (
      history.push("/home/statistic")
    );
  };
  return (
    <div>
      <section className="hero is-medium is-warning is-bold">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <article className="card">
                <br />
                <center>
                  <h1 className="title">
                    <div className="has-text-black">Please Login</div>
                  </h1>
                </center>
                <div className="card-content">
                  <p className="control">
                    <input
                      className="input"
                      type="email"
                      value={state.email}
                      onChange={setInputEmail}
                      placeholder="name@gmail.com"
                    />
                  </p>        
                  <p className="control">
                    <input
                      className="input"
                      type="password"
                      value={state.password}
                      onChange={setInputPassword}
                    />
                  </p>
                  <br />
                  <p className="control">
                    <button
                      className="button is-black is-fullwidth is-outlined"
                      onClick={submit}
                    >
                      Login
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
