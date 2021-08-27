import React from "react";

const AlertMessageContext = React.createContext(() => {});

export function AlertMessageProvider(props) {
  const [messageObject, setMessageObject] = React.useState({ severity: 'info', message: '', icon: 'info-circle' });

  function addMessage(severity, message) {
    let icon;
    switch (severity) {
      case 'info':
        icon = 'info-circle';
        break;
      case 'success':
        icon = 'check-circle';
        break;
      case 'danger':
        icon = 'exclamation-triangle';
        break;
      case 'warning':
        icon = 'exclamation-triangle';
        break;
    }
    setMessageObject({ severity: severity, message: message, icon: icon });
  };

  function addInfoMessage(message) {
    addMessage('info', message);
  };

  function addSuccessMessage(message) {
    addMessage('success', message);
  };

  function addErrorMessage(message) {
    addMessage('danger', message);
  };

  function addWarningMessage(message) {
    addMessage('warning', message);
  };

  function cleanMessage() {
    setMessageObject({ message: '' });
  }

  const value = React.useMemo(() => {
    return ({
      messageObject,
      cleanMessage,
      addMessage,
      addInfoMessage,
      addSuccessMessage,
      addWarningMessage,
      addErrorMessage
    });
  }, [messageObject, cleanMessage, addMessage, addInfoMessage, addSuccessMessage, addWarningMessage, addErrorMessage]);

  return <AlertMessageContext.Provider value={value} {...props} />
}

export function useAlertMessage() {
  const context = React.useContext(AlertMessageContext);

  if (!context) {
    throw new Error('useAlertMessage should be inside the provider AlertMessageContext');
  }

  return context;
}
