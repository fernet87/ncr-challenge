import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from './App';
import AlertMessage from './components/alert-message/alert-message';
import Header from './components/header';
import { AlertMessageProvider } from './contexts/alert-message-context';
import { FieldErrorProvider } from './contexts/field-error-context';
import { SessionProvider } from './contexts/user-context';
import Login from './views/login';
import PageNotFound from "./views/page-not-found";
import Stats from './views/stats/stats';
import Stores from './views/stores/stores';
import User from './views/user';
import Users from './views/users';
import reportWebVitals from './reportWebVitals';

const routing = (
  <React.StrictMode>
    <AlertMessageProvider>
      <AlertMessage></AlertMessage>
      <FieldErrorProvider>
        <BrowserRouter>
          <SessionProvider>
            <div className="container" >
              <Header />
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
      </FieldErrorProvider>
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
