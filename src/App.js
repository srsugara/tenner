import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css'; //Bulma css
import 'react-datepicker/dist/react-datepicker.css';
import AppContext from './AppContext'; //Datepicker css
import Header from './components/Header.jsx';
import SideMenu from './components/SideMenu.jsx';
import Login from './pages/Login.jsx';
import Statistic from './pages/Statistic.jsx';
import TestCase from './pages/TestCase.jsx';
import TestRun from './pages/TestRun.jsx';
import Report from './pages/Report.jsx';

const { NameProvider } = AppContext;

function App() {
  return (
    <div className="App">
      <NameProvider>
        <Header />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <div style={{ display: 'flex' }}>
              <div className="container">
                <div className="tile is-ancestor">
                  <SideMenu />
                  <Switch>
                    <Route path="/home/statistic">
                      <Statistic />
                    </Route>
                    <Route path="/home/test-case">
                      <TestCase />
                    </Route>
                    <Route path="/home/test-run">
                      <TestRun />
                    </Route>
                    <Route path="/home/report">
                      <Report />
                    </Route>
                  </Switch>
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      </NameProvider>
    </div>
  );
}

export default App;
