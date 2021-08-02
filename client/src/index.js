import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserProvider } from './contexts/user-context';
import { FieldErrorProvider } from './contexts/field-error-context';
import { AlertMessageProvider } from './contexts/alert-message-context';
import AlertMessage from './components/alert-message/alert-message';
import App from './App';
import Header from './components/header';
import Login from './views/login/login';
import Stores from './views/stores/stores';
import Users from './views/users';
import User from './views/user';
import Stats from './views/stats/stats';
import PageNotFound from "./views/page-not-found";
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

const routing = (
  <React.StrictMode>
    <AlertMessageProvider>
      <AlertMessage></AlertMessage>
      <FieldErrorProvider>
        <BrowserRouter>
          <UserProvider>
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
          </UserProvider>
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
