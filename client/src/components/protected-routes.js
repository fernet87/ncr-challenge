import { useEffect } from "react";
import { getSessionObject } from "../services/session-service";
import configData from "./../config.json";

const withAuth = WrappedComponent => {
  return function ProtectedRoutes(props) {

    useEffect(() => {
      const user = getSessionObject('user');
      if (!configData.DEVELOP_MODE && !user) {
        props.history.push('/login');
      }
    });
 
    return (
      <div>
        <WrappedComponent {...props} />
      </div>
    );
  }
}
 
export default withAuth;