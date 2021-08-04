import Axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import AngularGaugeChart from "../../components/charts/angular-gauge-chart/angular-gauge-chart";
import SelectField from "../../components/controls/fields/select/select-field";
import PanelForm from "../../components/panel-form";
import { useUser } from "../../contexts/user-context";
import { getStats } from "../../services/stats-service";
import { getStores } from "../../services/store-service";
import './stats.css';


export default function Stats() {
  const { checkLogin } = useUser();
  const methods = useForm();
  const [stores, setStores] = React.useState([]);
  const [stats, setStats] = React.useState({});

  function assignStats(storeId) {
    if (storeId > -1) {
      getStats(storeId).then((response) => {
        return response.data;
      }).then((statistics) => {
        setStats(statistics);
      });  
    }
  }

  function onStoreChange(storeId) {
    assignStats(storeId);
  }

  useEffect(() => {
    getStores().then((response) => {
      return response.data;
    }).then((storeList) => {
      let storeListForSelectField = [];
      storeListForSelectField.push({ value: -1, label: "Seleccione una tienda" });
      storeList.map((option) =>
        storeListForSelectField.push({ value: option.id, label: option.name })
      );
      setStores(storeListForSelectField);
      assignStats(storeListForSelectField[1].value);
      methods.setValue("store", 1);
    });
  }, []);

  return (
    <PanelForm title="Info de usuarios" size="large" methods={methods} >
      { checkLogin() }
      <div className="row">
        <div className="col-md-6">
          <SelectField
            attr="store"
            options={stores}
            onChange={onStoreChange}
            required >
          </SelectField>
        </div>
        <div className="col-md-6 quantity-stats">
          <div className="row">
            <div className="col-md-12">
              <h5>Cantidad de cajeros: { stats.numberOfCashiers } </h5>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h5>Cantidad de supervisores: { stats.numberOfSupervisors } </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 percentage-stats">
          <p>Porcentaje de cajeros sobre el total de usuarios: { stats.percentageOfCashiersOverTotalUsers }% </p>
        </div>
        <div className="col-md-6 percentage-stats">
          <p>Porcentaje de supervisores sobre el total de usuarios: { stats.percentageOfSupervisorsOverTotalUsers }% </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <AngularGaugeChart value={stats.percentageOfCashiersOverTotalUsers} id="angular-gauge-chart-1" ></AngularGaugeChart>
        </div>
        <div className="col-md-6">
          <AngularGaugeChart value={stats.percentageOfSupervisorsOverTotalUsers} id="angular-gauge-chart-2" ></AngularGaugeChart>
        </div>
      </div>

    </PanelForm>
  );
}
