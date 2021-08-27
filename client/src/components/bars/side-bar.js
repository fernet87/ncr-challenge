import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useBars } from "../../contexts/bars-context";
import { useSession } from "../../contexts/user-context";
import useNavigationItems, { updateActiveItem } from "../../hooks/navigation-items";
import Icon from "../icon";

const StyledSideBar = styled.div`
  height: calc(100% - 61px);
  position: absolute;
  &.small {
    width: 90px;
  }
  &.large {
    width: 280px;
  }
`;

const StyledNavLink = styled(Link)`
  cursor: pointer;
  
  &:hover {
    background-color: gray;
    color: white;
  }

  &.side-bar-close {
    padding: 0.5rem;
  }
`;

const StyledNavAnchor = styled.a`
  cursor: pointer;
  
  &:hover {
    background-color: gray;
    color: white;
  }

  &.side-bar-close {
    padding: 0.5rem;
  }
`;

const StyledNavItem = styled.li`
  margin-bottom: 5px;
`;

export default function SideBar(props) {
  const { session, logOut } = useSession();
  const [navigationItems, setNavigationItems] = useNavigationItems();
  const [currentItem, setCurrentItem] = useState(null);
  const {sidebarOpen} = useBars();

  const getActiveClass = (item) => {
    return (item.active) ? "active" : "link-dark";
  };

  const getSideBarOpenClass = () => {
    return (sidebarOpen) ? 'side-bar-open' : 'side-bar-close';
  };

  const getUserName = () => {
    return (session) ? session.user.name + " " + session.user.lastName : null;
  }

  const onItemClick = (item) => {
    if (item.action) {
      item.action();
    }

    setCurrentItem(item);
    updateActiveItem(navigationItems, item);
  };

  const updateItems = (sidebarOpenMode) => {
    if (navigationItems) {
      itemsDom = (
        <ul className="nav nav-pills flex-column mb-auto">
        {
          navigationItems.map((item, index) => (
            (!item.condition || (item.condition && item.condition())) ? 
              <StyledNavItem key={item.id} className="nav-item" >
                {
                  (item.path) ?
                    <StyledNavLink className={"nav-link " + getActiveClass(item) + " " + getSideBarOpenClass()} to={item.path} onClick={() => { onItemClick(item) }} >
                      <Icon fontName={item.icon} size={ (sidebarOpenMode) ? 'small' : 'medium' } ></Icon>
                      { (sidebarOpenMode) ? item.text : null }
                    </StyledNavLink>
                  :
                    <StyledNavAnchor className={"nav-link " + getActiveClass(item) + " " + getSideBarOpenClass()} onClick={() => { onItemClick(item) }} >
                      <Icon fontName={item.icon} small ></Icon>
                      {item.text}
                    </StyledNavAnchor>
                }
              </StyledNavItem>
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
  updateItems(sidebarOpen);

  useEffect(() => {
    updateItems(sidebarOpen);
  }, [currentItem]);

  return (
    <div>
      <StyledSideBar className={"d-flex flex-column flex-shrink-0 p-3 bg-light sidebar " + ((sidebarOpen) ? "large" : "small")} >
        {
          (props.title) ?
            <div>
              <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <Icon fontName={props.icon} ></Icon>
                <span className="fs-4">{props.title}</span>
              </a>
              <hr/>
            </div>
          :
            null
        }
        <ul className="nav nav-pills flex-column mb-auto">
          {itemsDom}
        </ul>
        <hr/>
        <div className="dropdown">
          <a href="#" className="d-flex align-items-center link-dark text-decoration-none" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
            <Icon fontName="person-circle" size={ (sidebarOpen) ? 'medium' : 'large' }></Icon>
            { (sidebarOpen) ? <strong>{getUserName()}</strong> : null }
          </a>
          <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser">
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#" onClick={logOut} >Sign out</a></li>
          </ul>
        </div>
      </StyledSideBar>
    </div>
  );
}