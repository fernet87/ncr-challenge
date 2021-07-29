import React from "react";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { useUser } from "../contexts/user-context";
import PanelForm from "../components/panel-form";
import InputField from "../components/controls/fields/input/input-field";
import { useForm } from "react-hook-form";
import SelectField from "../components/controls/fields/select/select-field";
import configData from "../config.json";
import Axios from "axios";
import { useAlertMessage } from "../contexts/alert-message-context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useFieldError } from "../contexts/field-error-context";
import TextField from "../components/controls/fields/input/text-field";
import MailField from "../components/controls/fields/input/mail-field";
import PasswordField from "../components/controls/fields/input/password-field";
import SubmitButton from "../components/controls/buttons/submit-button";

const [
  NAME,
  LAST_NAME,
  USER,
  EMAIL,
  PASSWORD,
  REPEAT_PASSWORD,
  PROFILE
] = [
  { id: 'name', label: 'Nombre' },
  { id: 'lastName', label: 'Apellido' },
  { id: 'user',  label: 'Usuario' },
  { id: 'mail', label: 'E-Mail' },
  { id: 'password', label: 'Contraseña' },
  { id: 'repeatPassword', label: 'Repetir Contraseña' },
  { id: 'profile', label: 'Perfil' }
];

export default function User() {
  const history = useHistory();
  const { checkLogin } = useUser();
  const location = useLocation();
  const defaultValues = location.state;
  const methods = useForm({ defaultValues: defaultValues });
  const [update, setUpdate] = React.useState(false);
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const { addFieldError, cleanFieldError } = useFieldError();

  const onCreateUser = () => {
    cleanFieldError();
    const user = methods.getValues();
    let valid = true;
    if (!update && (user.password !== user.repeatPassword)) {
      valid = false;
      addFieldError(REPEAT_PASSWORD.id, "Esta contraseña debe ser igual a la del campo password.");
    }
    if (valid) {
      let responsePromise;
      if (update) {
        responsePromise = updateUser();
      } else {
        responsePromise = createUser();
      }
      responsePromise.then(response => {
        return response.data;
      }).then(user => {
        const values = methods.getValues();
        addSuccessMessage("El usuario " + user.name + " fue " + ((update) ? "actualizado" : "creado") + " exitosamente.");
        history.push('/Users', { store: values.store } );
      }).catch((error) => {
        if (error.response) {
          addFieldError(error.response.data.field,  error.response.data.message);
          addErrorMessage(error.response.data.message);
        }
      });
    }
  };

  function createTransferObject() {
    const values = methods.getValues();
    return {
      name: values.name,
      lastName: values.lastName,
      user: values.user,
      mail: values.mail,
      password: values.password,
      repeatPassword: values.repeatPassword,
      profile: values.profile,
      storeId: values.store.id
    };
  }

  async function createUser() {
    const createObject = createTransferObject();
    return await Axios.post(configData.SERVER_URL + 'user/create', createObject);
  };

  async function updateUser() {
    const updateObject = createTransferObject();
    updateObject.id = methods.getValues().id;
    return await Axios.put(configData.SERVER_URL + 'user/update', updateObject);
  };

  const getActionLabel = () => {
    return (update) ? 'Actualizar' : 'Crear';
  }
  
  const getTitle = () => {
    // let name = (location.state) ? location.state.name : "";
    return getActionLabel() + " usuario" + ((update) ? /*name*/ "" : " nuevo") + ".";
  }

  useEffect(() => {
    if (location.state && location.state.user) {
      setUpdate(true);
      // setTitle(getTitle());
    }
  }, [location.state]);
  
  return (
    <PanelForm title={getTitle()} size="medium" methods={methods} onSubmit={onCreateUser} >
      { checkLogin() }
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <TextField attr={NAME.id} label={NAME.label} required ></TextField>
          </div>
          <div className="col-md-6">
            <TextField attr={LAST_NAME.id} label={LAST_NAME.label} required ></TextField>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <TextField attr={USER.id} label={USER.label} required ></TextField>
          </div>
          <div className="col-md-6">
            <MailField attr={EMAIL.id} label={EMAIL.label} required ></MailField>
          </div>
        </div>
        {(!update) ? (
          <div className="row">
            <div className="col-md-6">
              <PasswordField attr={PASSWORD.id} label={PASSWORD.label} minLength='8' required ></PasswordField>
            </div>
            <div className="col-md-6">
              <PasswordField attr={REPEAT_PASSWORD.id} label={REPEAT_PASSWORD.label} minLength='8' required ></PasswordField>
            </div>
          </div>
        ) : (<></>) }
        <div className="row">
          <div className="col-md-6">
            <SelectField
              attr={PROFILE.id}
              label={PROFILE.label}
              options={[{value: 1, label: 'Cajero'}, {value: 2, label: 'Supervisor'}]} 
              required >
            </SelectField>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-2" align="center" >
          <SubmitButton label={getActionLabel()} ></SubmitButton>
        </div>
      </div>
    </PanelForm>
  );
}
