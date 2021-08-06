// React context Tutorial
// https://www.youtube.com/watch?v=gigKP6PPmW0

import React from "react";
import { useAlertMessage } from "./alert-message-context";
import { useHistory } from "react-router";
import { useFieldError } from "./field-error-context";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import jsSHA from "jssha";
import configData from "./../config.json";
import { logIn as logInCall } from "../services/login-service";

const UserContext = React.createContext(() => {});

export function UserProvider(props) {
    const [token, setToken] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const { addFieldError, cleanFieldError } = useFieldError();
    const { addSuccessMessage, addErrorMessage } = useAlertMessage();
    const history = useHistory();

    async function logIn(user, password) {
        cleanFieldError();
        const shaObj = new jsSHA("SHA-256", "TEXT", { encoding: "UTF8" });
        shaObj.update(password);
        const hashedPassword = shaObj.getHash("HEX");
        
        logInCall({params: {user, password: hashedPassword}})
        .then((response) => {
            setUser(response);
            // setToken(response.token);
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
        setUser(null);
        setToken(null);
        history.push("/Login");
    }

  const checkLogin = () => {
    if (!configData.DEVELOP_MODE && !user) {
      return <Redirect to="/login" />;
    }
    return <></>;
  }

    const value = React.useMemo(() => {
        return ({
            user,
            token,
            logIn,
            logOut,
            checkLogin
        });
    }, [user, token]);

    return <UserContext.Provider value={value} {...props} />
}

export function useUser() {
    const context = React.useContext(UserContext);

    if (!context) {
        throw new Error('useUser should be inside the provider UserContext');
    }

    return context;
}
