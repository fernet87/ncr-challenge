import configData from "./config.json";

const StoreContext = React.createContext((themeName) => {});

export function StoreProvider(props) {
  const [stores, setStores] = React.useState([]);
  
  async function getStores() {
    const { stores } = await Axios.get(configData.SERVER_URL + 'store');
    setStores(stores);
  };


  const value = React.useMemo(() => {
    return ({
      stores
    });
  }, [stores]);

  return <StoreContext.Provider value={value} {...props} />
}

export function useStore() {
  const context = React.useContext(StoreContext);

  if (!context) {
      throw new Error('useStore should be inside the provider StoreContext');
  }

  return context;
}
