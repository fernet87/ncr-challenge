import React from "react";

const AlertMessageContext = React.createContext(() => {});

export function AlertMessageProvider(props) {
    const [messageObject, setMessageObject] = React.useState({ severity: 'info', message: '' });

    function addMessage(severity, message) {
        setMessageObject({ severity: severity, message: message });
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
