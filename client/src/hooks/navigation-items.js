import { useState } from "react";
import { useSession } from "../contexts/user-context";

const itemList = [
  { id: 'Stores', path: '/Stores', text: 'Tiendas', icon: 'shop' },
  { id: 'Stats', path: '/Stats', text: 'Info de usuarios', icon: 'info-circle' },
  { id: 'Login', path: '/Login', text: 'Login', icon: 'people' }
];

const storesItem = itemList.find((item) => { return item.id === 'Stores'; });
const statsItem = itemList.find((item) => { return item.id === 'Stats'; });
const loginItem = itemList.find((item) => { return item.id === 'Login'; });

export const updateActiveItem = (itemList, defaultValue) => {
  itemList.forEach(itemInLoop => {
    itemInLoop.active = false;
  });

  if (defaultValue) {
    const item = itemList.filter((itemToFilter) => { return itemToFilter.id === defaultValue.id; })[0];
    if (item) {
      item.active = true;
    }
  }
  else {
    itemList[0].active = true;
  }    
}

export default function useNavigationItems(defaultValue) {
  const { session, logOut } = useSession();
  
  // Conditions
  storesItem.condition = () => { return session };
  statsItem.condition = () => { return session };
  loginItem.condition = () => { return !session };

  const [navigationItems, setNavigationItems] = useState(null);

  if (!navigationItems) {
    const currentItem = itemList.find((item) => { return item.path === window.location.pathname; });
    setNavigationItems(itemList);
    updateActiveItem(itemList, currentItem);
  }

  return [navigationItems, setNavigationItems];
};
