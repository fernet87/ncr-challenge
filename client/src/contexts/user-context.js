// React context Tutorial
// https://www.youtube.com/watch?v=gigKP6PPmW0

import React from "react";
import { useAlertMessage } from "./alert-message-context";
import { useHistory } from "react-router";
import { useError } from "./error-context";
import { logIn as logInCall } from "../services/login-service";
import { getSession, setSessionObject, destroySession } from "../services/session-service";

const SessionContext = React.createContext(() => {});

export function SessionProvider(props) {
    const { addFieldError, cleanFieldError } = useError();
    const { addSuccessMessage, addErrorMessage } = useAlertMessage();
    const [ session, setSession ] = React.useState(getSession());
    const history = useHistory();
    
    const value = React.useMemo(() => {
        const logIn = async function(user, password) {
            cleanFieldError();
    
            logInCall(user, password)
            .then((user) => {
                setSessionObject('user', user);
                setSession(getSession());
                addSuccessMessage("Te logueaste exitosamente!");
                history.push("/Stores");
                return user;
            })
            .catch((error) => {
                addFieldError(error.field,  error.message);
                addErrorMessage(error.message);
                return error;
            });
        };
        
        const logOut = () => {
            destroySession();
            setSession(getSession());
            history.push("/Login");
        }

        return ({
            session,
            logIn,
            logOut
        });
    }, [session, addErrorMessage, addFieldError, addSuccessMessage, cleanFieldError, history]);

    return <SessionContext.Provider value={value} {...props} />
}

export function useSession() {
    const context = React.useContext(SessionContext);

    if (!context) {
        throw new Error('useSession should be inside the provider SessionContext');
    }

    return context;
}
