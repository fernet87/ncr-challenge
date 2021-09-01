import React from "react";

const ModelContext = React.createContext(() => {});

export function ModelProvider(props) {
  function set(attr, value) {
    if (props.model) {
      props.model[attr] = value;
    }
  };

  function get(attr) {
    return (props.model) ? props.model[attr] : undefined;
  }

  const value = React.useMemo(() => {
    return ({
      set,
      get
    });
  }, []);

  return <ModelContext.Provider value={value} {...props} />
}

export function useModel() {
  const context = React.useContext(ModelContext);

  if (!context) {
    throw new Error('useModel should be inside the provider ModelContext');
  }

  return context;
}
