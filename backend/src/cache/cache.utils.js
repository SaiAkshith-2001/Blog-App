import redisCache from "./redis.cache.js";

export const setJson = async (key, value, expiresAt) => {
  try {
    const jsonString = JSON.stringify(value);
    if (expiresAt) {
      const ttl = expiresAt?.getTime() - Date.now();
      return await redisCache.client.set(key, jsonString, { PX: ttl });
    } else {
      return await redisCache.client.set(key, jsonString);
    }
  } catch (error) {
    console.error("Error setting JSON in Redis:", error);
  }
};

export const getJson = async (key) => {
  try {
    const jsonString = await redisCache.client.get(key);
    if (jsonString) {
      return await JSON.parse(jsonString);
    }
    return null;
  } catch (error) {
    console.error("Error getting JSON from Redis:", error);
    return null;
  }
};
