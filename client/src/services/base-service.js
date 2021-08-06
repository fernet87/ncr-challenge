import Axios from "axios";
import configData from "./../config.json";

const SERVER_URL = configData.SERVER_URL;

async function processRequest(promise) {
  return new Promise(function(resolve, reject) {
    promise.then((response) => {
      return response.data;
    }).then((data) => {
      if (data.status.indexOf("OK") > -1) {
        resolve(data.model);
      }
    }).catch((error) => {
      return error.response.data;
    }).then((errorData) => {
      if (errorData) {
        reject(errorData);
      }
    });
  });
}

export async function get(url, body) {
  return await processRequest(Axios.get(SERVER_URL + url, body));
}

export async function findById(url, id) {
  return get(url + '/' + id);
}

export async function post(url, body) {
  return await processRequest(Axios.post(SERVER_URL + url, body));
}

export async function put(url, body) {
  return await processRequest(Axios.put(SERVER_URL + url, body));
}

export async function remove(url, id) {
  return await processRequest(Axios.delete(SERVER_URL + url + '/' + id));
}