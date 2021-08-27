import React from "react";
import { useAlertMessage } from "../../contexts/alert-message-context";
import './alert-message.css'

export default function AlertMessage() {
  const { messageObject, cleanMessage } = useAlertMessage();

  const cleanMessageIfExistsInDOM = () => {
    let alert = document.getElementsByClassName('alert')[0];
    if (alert) {
      cleanMessage();
    }    
  }

  const onCloseAlertMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    cleanMessageIfExistsInDOM();
  };

  setTimeout(function() {
    cleanMessageIfExistsInDOM();
  }, 5000);

  const alertMessage = (
    <div className={"alert floating alert-server alert-" + messageObject.severity} onClose={onCloseAlertMessage} role="alert">
      { messageObject.message }
      <button type="button" className="btn-close btn-floating" data-bs-dismiss="alert" aria-label="Close" onClick={onCloseAlertMessage} ></button>
    </div>
  );
  
  return (
    <div>
      {
        (messageObject.message && messageObject.message.length > 0) ? (alertMessage) : (<></>)
      }
    </div>
  );
}