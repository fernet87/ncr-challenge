import Axios from "axios";
import configData from "./../config.json";

const SERVER_URL = configData.SERVER_URL;

export async function get(url, body) {
  return await Axios.get(SERVER_URL + url, body);
}

export async function post(url, body) {
  return await Axios.post(SERVER_URL + url, body);
}

export async function put(url, body) {
  return await Axios.put(SERVER_URL + url, body);
}

export async function remove(url, id) {
  return await Axios.delete(SERVER_URL + url + '/' + id);
}