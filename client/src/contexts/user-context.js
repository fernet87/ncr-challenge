// React context Tutorial
// https://www.youtube.com/watch?v=gigKP6PPmW0

import React from "react";
import { useAlertMessage } from "./alert-message-context";
import { useHistory } from "react-router";
import { useFieldError } from "./field-error-context";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import configData from "./../config.json";
import { logIn as logInCall } from "../services/login-service";
import { getSession, getSessionObject, setSessionObject, destroySession } from "../services/session-service";

const UserContext = React.createContext(() => {});

export function UserProvider(props) {
    const { addFieldError, cleanFieldError } = useFieldError();
    const { addSuccessMessage, addErrorMessage } = useAlertMessage();
    const [ session, setSession ] = React.useState(getSession());
    const history = useHistory();

    async function logIn(user, password) {
        cleanFieldError();

        logInCall(user, password)
        .then((response) => {
            setSessionObject('user', response);
            setSession(getSession());
            addSuccessMessage("Te logueaste exitosamente!");
            history.push("/Stores");
            return response;
        })
        .catch((error) => {
            addFieldError(error.field,  error.message);
            addErrorMessage(error.message);
            return error;
        });
    };
    
    function logOut() {
        destroySession();
        setSession(getSession());
        history.push("/Login");
    }

  const checkLogin = () => {
    const user = getSessionObject('user');
    if (!configData.DEVELOP_MODE && !user) {
      return <Redirect to="/login" />;
    }
    return <></>;
  }

    const value = React.useMemo(() => {
        return ({
            session,
            logIn,
            logOut,
            checkLogin
        });
    }, [session]);

    return <UserContext.Provider value={value} {...props} />
}

export function useUser() {
    const context = React.useContext(UserContext);

    if (!context) {
        throw new Error('useUser should be inside the provider UserContext');
    }

    return context;
}
