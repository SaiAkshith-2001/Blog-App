import { getJson, setJson } from "./cache.utils.js";
import redisCache from "./redis.cache.js";

export const saveAllPostsToCache = async (key, posts, expiresAt) => {
  return setJson(key, posts, expiresAt);
};

export const getAllPostsFromCache = async (key) => {
  return getJson(key);
};

export const savePostToCache = async (key, postId, expiresAt) => {
  return setJson(key, postId, expiresAt);
};

export const getPostFromCache = async (key) => {
  return await getJson(key);
};

export const invalidatePostCache = async (key) => {
  return await redisCache.client.del(key);
};
