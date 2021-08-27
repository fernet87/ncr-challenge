import Icon from "../../icon/icon";
import './side-bar.css';
import useNavigationItems, { updateActiveItem } from "../../../hooks/navigation-items"
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSession } from "../../../contexts/user-context";

export default function SideBar(props) {
  const { logOut } = useSession();
  const [navigationItems, setNavigationItems] = useNavigationItems();
  const [currentItem, setCurrentItem] = useState(null);

  const getActiveClass = (item) => {
    return (item.active) ? "active" : "link-dark";
  };

  const onItemClick = (item) => {
    if (item.action) {
      item.action();
    }

    setCurrentItem(item);
    updateActiveItem(navigationItems, item);
  };

  const updateItems = () => {
    if (navigationItems) {
      itemsDom = (
        <ul className="nav nav-pills flex-column mb-auto">
        {
          navigationItems.map((item, index) => (
            (!item.condition || (item.condition && item.condition())) ? 
              <li key={item.id} className="nav-item" >
                {
                  (item.url) ?
                    <Link className={"nav-link " + getActiveClass(item)} to={item.url} onClick={() => { onItemClick(item) }} >
                      <Icon fontName={item.icon} small ></Icon>
                      {item.text}
                    </Link>
                  :
                    <a className={"nav-link " + getActiveClass(item)} onClick={() => { onItemClick(item) }} >
                      <Icon fontName={item.icon} small ></Icon>
                      {item.text}
                    </a>
                }
              </li>
            : 
              null
            )
          )
        }
      </ul>
      );
    }
  };

  let itemsDom;
  updateItems();

  useEffect(() => {
    updateItems();
  }, [currentItem]);

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar" >
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <Icon fontName={props.icon} ></Icon>
        <span className="fs-4">{props.title}</span>
      </a>
      <hr/>
      <ul className="nav nav-pills flex-column mb-auto">
        {itemsDom}
      </ul>
      <hr/>
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
          <Icon fontName="person-circle" medium></Icon>
          <strong>mdo</strong>
        </a>
        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="#" onClick={logOut} >Sign out</a></li>
        </ul>
      </div>
    </div>
  );
}