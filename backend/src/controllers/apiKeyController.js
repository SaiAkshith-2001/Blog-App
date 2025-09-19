import { APIKey, PERMISSION } from "../models/apiKey.Schema.js";
export const createApiKey = async (
  userId,
  key,
  permissions = PERMISSION.general,
  status = true
) => {
  try {
    const apiKey = await APIKey.create({ userId, key, permissions, status });
    return apiKey;
  } catch (error) {
    console.error("something went wrong", error);
  }
};
