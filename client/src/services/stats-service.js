import { get } from "./base-service";

const BASE_URL = 'stats/';

export async function getStats(storeId) {
  return get(BASE_URL + storeId);
}
