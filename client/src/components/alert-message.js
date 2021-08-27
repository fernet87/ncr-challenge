import React from "react";
import { useAlertMessage } from "../contexts/alert-message-context";
import styled from 'styled-components'

const StyledAlertMessage = styled.div`
  // floating
  float: right;
  top: 20px;
  right: 20px;
  z-index: 9999;

  // btn-floating
  float: right;
  right: 20px;

  // alert-server
  margin-bottom: 0;
  border-radius: 10px;
`;


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
    <StyledAlertMessage className={"alert floating alert-server alert-" + messageObject.severity} onClose={onCloseAlertMessage} role="alert">
      { messageObject.message }
      <button type="button" className="btn-close btn-floating" data-bs-dismiss="alert" aria-label="Close" onClick={onCloseAlertMessage} ></button>
    </StyledAlertMessage>
  );
  
  return (
    <div>
      {
        (messageObject.message && messageObject.message.length > 0) ? (alertMessage) : (<></>)
      }
    </div>
  );
}