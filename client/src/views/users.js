import React, { useCallback, useEffect } from 'react';
import { useHistory, useLocation } from "react-router";
import { Link } from 'react-router-dom';
import AlertDialog from "../components/alert-dialog";
import { useSession } from "../contexts/user-context";
import { useAlertMessage } from "../contexts/alert-message-context";
import { deleteUser, findUsersByStore } from '../services/user-service';
import Panel from "../components/panel";
import Icon from '../components/icon';
import styled from 'styled-components'

const StyledTD = styled.td`
  vertical-align: middle;
`;

const StyledTH = styled.th`
  vertical-align: middle;
`;

const columns =  [
  { id: 'name', label: 'Nombre' },
  { id: 'lastName', label: 'Apellido' },
  { id: 'user',  label: 'Usuario' },
  { id: 'mail', label: 'E-Mail' },
  { id: 'profile', label: 'Perfil' }
];

export default function Users() {
  const history = useHistory();
  const location = useLocation();
  const { checkLogin } = useSession();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const [userItems, setUserItems] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [alertConfirmation, setAlertConfirmation] = React.useState(false);
  const [userToBeDeleted, setUserToBeDeleted] = React.useState(null);

  const getProfileDescription = (profile) => {
    let profileDescription = '';

    if (profile === 1) {
      profileDescription = 'Cajero';
    }
    else if (profile === 2) {
      profileDescription = 'Supervisor';
    }

    return profileDescription;
  }

  const getTitle = () => {
    return (!location.state || !location.state.store) ? "" : "Usuarios de la tienda " + location.state.store.name;
  }

  const createUser = () => {
    history.push('/User', { store: location.state.store, profile: 1 });
  }

  const deleteUserAlert = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const removeUser = useCallback((user) => {
    setUserToBeDeleted(user)
    deleteUserAlert()
  }, [deleteUserAlert, setUserToBeDeleted]);

  const refreshTable = useCallback(() => {
    let storeId = (!location.state) ? -1 : location.state.store.id;
    if (storeId > -1) {
      findUsersByStore(storeId).then((users) => {
        const userItemList = users.map((user) =>
          <tr  key={user.user} >
            <StyledTH scope="row">
              <Link to={{pathname: "/User", state: user}} >{user.name}</Link>
            </StyledTH>
            <StyledTD>{user.lastName}</StyledTD>
            <StyledTD>{user.user}</StyledTD>
            <StyledTD>{user.mail}</StyledTD>
            <StyledTD>{getProfileDescription(user.profile)}</StyledTD>
            <StyledTD className="fs-4 mb-3">
              <Icon fontName="trash-fill" medium onClick={() => removeUser(user)} ></Icon>
            </StyledTD>
          </tr>
        );
        setUserItems(userItemList);
      });  
    }
  }, [location, removeUser]);

  useEffect(() => {
    refreshTable();
  }, [refreshTable]);

  useEffect(() => {
    if (alertConfirmation) {
      setAlertConfirmation(false);
      if (userToBeDeleted) {
        const userName = userToBeDeleted.name;
        deleteUser(userToBeDeleted.id).then((user) => {
          addSuccessMessage("El usuario " + userName + " fue eliminado exitosamente.");
          refreshTable();
        }).then((errorData) => {
          if (errorData) {
            addErrorMessage(errorData.message);
          }
        });
      }
    }
  }, [alertConfirmation, userToBeDeleted, refreshTable, setAlertConfirmation, addSuccessMessage, addErrorMessage]);

  return (
    <Panel title={getTitle()} size="large" >
      { checkLogin() }
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <StyledTH scope="col" key={column.id}>{column.label}</StyledTH>
            ))}
            <StyledTH scope="col" className="fs-4 mb-3">
              <Icon fontName="plus" medium onClick={() => createUser()} ></Icon>
            </StyledTH>
          </tr>
        </thead>
        <tbody>
          { userItems }
        </tbody>
      </table>

      <AlertDialog
        title="Eliminar Usuario"
        message={"Esta seguro que desea eliminar el usuario " + ((userToBeDeleted) ? userToBeDeleted.name : "") + "?"}
        show={show}
        setShow={setShow}
        setConfirmation={setAlertConfirmation}>
      </AlertDialog>
    </Panel>
  );
}
