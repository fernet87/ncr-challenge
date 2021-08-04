import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useUser } from "../../contexts/user-context";
import { getStores } from "../../services/store-service";
import Panel from "../../components/panel/panel";
import "./stores.css";

export default function Stores(props) {
  const history = useHistory();
  const { checkLogin } = useUser();

  function navigateToStore(store) {
    history.push('/Users', { store: store } );
  };

  const [storeItems, setStoreItems] = React.useState([]);

  useEffect(() => {
    getStores().then((stores) => {
      const storeItemList = stores.data.map((store) =>
        <div onClick={() => navigateToStore(store)} className="col-md-8 stores-container" key={store.number} >
          <div className="row" >
            <div className="col-md-3" >
              <div className="circle" >
                {store.number}
              </div>
            </div>
            <div className="col-md-9" >
              <span className="text" >{store.name}</span>
            </div>
          </div>
        </div>
      );
      setStoreItems(storeItemList);
    });
  }, []);

  return (
    <Panel title="Tiendas" size="small" >
      { checkLogin() }
      <div className="row justify-content-center" >
        { storeItems }
      </div>
    </Panel>
  );
}
