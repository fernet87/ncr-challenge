import React from 'react';

const ModelContext = React.createContext(() => {});

export function ModelProvider(props) {
  const value = React.useMemo(() => {
    function set(attr, value) {
      if (props.model) {
        props.model[attr] = value;
      }
    }

    function get(attr) {
      return props.model ? props.model[attr] : undefined;
    }
    return {
      set,
      get,
    };
  }, [props.model]);

  return <ModelContext.Provider value={value} {...props} />;
}

export function useModel() {
  const context = React.useContext(ModelContext);

  if (!context) {
    throw new Error('useModel should be inside the provider ModelContext');
  }

  return context;
}
