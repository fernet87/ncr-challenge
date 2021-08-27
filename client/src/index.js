import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from './App';
import AlertMessage from './components/alert-message';
import { AlertMessageProvider } from './contexts/alert-message-context';
import { ErrorProvider } from './contexts/field-error-context';
import { SessionProvider } from './contexts/user-context';
import Login from './views/login';
import PageNotFound from "./views/page-not-found";
import Stats from './views/stats';
import Stores from './views/stores';
import User from './views/user';
import Users from './views/users';
import reportWebVitals from './reportWebVitals';
import NavBar from './components/bars/nav-bar';
import SideBar from './components/bars/side-bar';
import { BarsProvider } from './contexts/bars-context';

const routing = (
  <React.StrictMode>
    <AlertMessageProvider>
      <AlertMessage></AlertMessage>
      <ErrorProvider>
        <BrowserRouter>
          <SessionProvider>
            <BarsProvider>
              <NavBar title="NCR Challenge" />
              <SideBar icon="cart3" ></SideBar>
            </BarsProvider>
            <div className="container" >
              <div className="row justify-content-center">
                <div className="col">
                  <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/Login">
                      <Login />
                    </Route>
                    <Route exact path="/Stores">
                      <Stores />
                    </Route>
                    <Route exact path="/Users">
                      <Users />
                    </Route>
                    <Route exact path="/User">
                      <User />
                    </Route>
                    <Route exact path="/Stats">
                      <Stats />
                    </Route>
                    <Route component={PageNotFound} />
                  </Switch>
                </div>
              </div>
            </div>
          </SessionProvider>
        </BrowserRouter>
      </ErrorProvider>
    </AlertMessageProvider>
  </React.StrictMode>
);


ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
