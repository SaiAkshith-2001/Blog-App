import { KeyStore } from "../models/keyStore.Schema.js";

export const createKeyStores = async (userId, primaryKey, secondaryKey) => {
  const keys = await KeyStore.create({ userId, primaryKey, secondaryKey });
  return keys;
};
