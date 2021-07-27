import { withStyles, makeStyles, Link } from "@material-ui/core";

import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory, useLocation } from "react-router";
import configData from "./../config.json";
import Axios from "axios";
import AlertDialog from "../components/alert-dialog";
import { useUser } from "../contexts/user-context";
import Panel from "../components/panel/panel";
import { useAlertMessage } from "../contexts/alert-message-context";


const columns =  [
  { id: 'name', label: 'Nombre' },
  { id: 'lastName', label: 'Apellido' },
  { id: 'user',  label: 'Usuario' },
  { id: 'mail', label: 'E-Mail' },
  { id: 'profile', label: 'Perfil' }
];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  icon: {
    cursor: 'pointer'
  }
});


export default function Users() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { checkLogin } = useUser();
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
    return (!location.state) ? "" : "Usuarios de la tienda " + location.state.store.name;
  }
  
  const updateUser = (user) => {
    history.push('/User', user);
  };

  const createUser = () => {
    history.push('/User', { store: location.state.store });
  }

  const removeUser = (user) => {
    setUserToBeDeleted(user)
    deleteUserAlert()
  }

  async function getUsersByStore(storeId) {
    return await Axios.get(configData.SERVER_URL + 'user/byStoreId/' + storeId);
  };
  
  function deleteUserAlert() {
    setShow(true);
  };

  async function deleteUser(userId) {
    return await Axios.delete(configData.SERVER_URL + 'user/' + userId);
  };

  function refreshTable() {
    let storeId = (!location.state) ? -1 : location.state.store.id;
    if (storeId > -1) {
      getUsersByStore(storeId).then((users) => {
        const userItemList = users.data.map((user) =>
          <StyledTableRow key={user.name}>
            <StyledTableCell component="th" scope="row">
              <Link href="#" onClick={() => updateUser(user)} >
                {user.name}
              </Link>
            </StyledTableCell>
            <StyledTableCell align="left">{user.lastName}</StyledTableCell>
            <StyledTableCell align="left">{user.user}</StyledTableCell>
            <StyledTableCell align="left">{user.mail}</StyledTableCell>
            <StyledTableCell align="left">{getProfileDescription(user.profile)}</StyledTableCell>
            <StyledTableCell align="left">
              <DeleteIcon fontSize='large' onClick={() => removeUser(user)} className={classes.icon} ></DeleteIcon>
            </StyledTableCell>
          </StyledTableRow>
        );
        setUserItems(userItemList);
      });  
    }
  }

  useEffect(() => {
    refreshTable();
  }, []);

  useEffect(() => {
    if (alertConfirmation) {
      setAlertConfirmation(false);
      if (userToBeDeleted) {
        const userName = userToBeDeleted.name;
        deleteUser(userToBeDeleted.id).then((response) => {
          return response.data;
        }).then((user) => {
          if (user.status.indexOf("OK") > -1) {
            addSuccessMessage("El usuario " + userName + " fue eliminado exitosamente.");
            refreshTable();
          }
        }).catch((error) => {
          return error.response.data;
        }).then((errorData) => {
          if (errorData) {
            addErrorMessage(errorData.message);
          }
        });
      }
    }
  }, [alertConfirmation]);

  return (
    <Panel title={getTitle()} size="large" >
      { checkLogin() }

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell align="left" key={column.id} >{column.label}</StyledTableCell>
              ))}
              <StyledTableCell align="left">
                <AddIcon fontSize='large' onClick={() => createUser()} ></AddIcon>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { userItems }
          </TableBody>
        </Table>
      </TableContainer>

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
