import React from "react"
import { useHistory } from "react-router";

const ServerNotReady = () => {
  const history = useHistory();

  const getServerNotAvailableTitle = () => {
    return "The application server is currently not available";
  }
  
  const getServerNotAvailableDescription = () => {
    return "Please try again later.";
  }
  
  const getServerNotAvailableActionText = () => {
    return "Try again";
  }

  const onServerNotAvailableAction = () => {
    history.push('/');
  }

  return (
    <div className="content">
      <div className="">
        <h2>
          {getServerNotAvailableTitle()}
        </h2>
        <h3>
          {getServerNotAvailableDescription()}
        </h3>
        <h3>
          <a href="/#" onClick={onServerNotAvailableAction()} >{getServerNotAvailableActionText()}</a>
        </h3>
      </div>
    </div>
  )
}
export default ServerNotReady