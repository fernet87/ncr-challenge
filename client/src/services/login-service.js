import { get } from "./base-service";
import jsSHA from "jssha";

const BASE_URL = 'login';

export async function logIn(user, password) {
  const shaObj = new jsSHA("SHA-256", "TEXT", { encoding: "UTF8" });
  shaObj.update(password);
  const hashedPassword = shaObj.getHash("HEX");

  return get(BASE_URL, {params: {user, password: hashedPassword}});
}
