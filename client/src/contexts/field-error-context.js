import React from "react";

const FieldErrorContext = React.createContext(() => {});

export function FieldErrorProvider(props) {
    const [fieldErrorData, setFieldErrorData] = React.useState({ field: null, message: '' });

    function addFieldError(field, message) {
        setFieldErrorData({ field: field, message: message });
    };

    function cleanFieldError() {
        setFieldErrorData({ field: null, message: '' });
    }

    const value = React.useMemo(() => {
        return ({
            fieldErrorData,
            cleanFieldError,
            addFieldError
        });
    }, [fieldErrorData]);

    return <FieldErrorContext.Provider value={value} {...props} />
}

export function useFieldError() {
    const context = React.useContext(FieldErrorContext);

    if (!context) {
        throw new Error('useFieldError should be inside the provider FieldErrorContext');
    }

    return context;
}
