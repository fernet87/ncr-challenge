import React from "react";

import { useForm } from "react-hook-form";
import { useUser } from "../../contexts/user-context";
import InputField from "../../components/fields/input/input-field";
import './login.css';
import PanelForm from "../../components/panel-form";

const [USER, PASSWORD] = ['user', 'password'];

export default function Login() {
  const methods = useForm();

  const { logIn } = useUser();

  const doLogin = (userData) => {
    if (userData.user && userData.password) {
      logIn(userData.user, userData.password);
    }
  }

  return (
    <PanelForm title="Login" size="small" methods={methods} onSubmit={doLogin} >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <InputField type="text" attr={USER} label="User or Email address" required ></InputField>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <InputField type="password" attr={PASSWORD} label="Password" required ></InputField>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
          </div>
        </div>
      </div>
    </PanelForm>
  );
}
