import { get, post, put, remove } from "./base-service";

const BASE_URL = 'user/';

export async function getUsersByStore(storeId) {
  return get(BASE_URL + 'byStoreId/' + storeId);
}

export async function createUser(createObject) {
  return post(BASE_URL + 'create', createObject);
};

export async function updateUser(updateObject) {
  return put(BASE_URL + 'update', updateObject);
};

export async function deleteUser(userId) {
  return remove(BASE_URL + userId);
};