import { createClient } from "redis";
import { redisConfig } from "../config/constants.js";

// const url = `redis://:${encodeURIComponent(redisConfig.password)}@${
//   redisConfig.host
// }:${redisConfig.port}`;
// const client = createClient({ url });

const cloudURL = redisConfig.url;

const client = createClient({ url: cloudURL });
client.on("reconnecting", () => console.log("Redis Client reconnecting..."));
client.on("error", (err) => console.log("Redis Client error", err));
client.on("end", () => console.log("Redis Client connection closed"));

const connectRedis = async () => {
  try {
    await client.connect();
    console.log("Redis connected successfully");
  } catch (error) {
    console.error("Redis not connected, error: ", error.message);
  }
};

export default { client, connectRedis };
