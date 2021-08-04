import { get } from "./base-service";

const BASE_URL = 'login/';

export async function logIn(body) {
  return get(BASE_URL, body);
}
