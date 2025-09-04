import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || 5000;
export const env = process.env.NODE_ENV || "development";
export const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3001";
export const clientId = process.env.CLIENT_ID;

export const dbConfig = {
  url: process.env.MONGODB_URL,
  name: process.env.DB_NAME,
};

export const tokenInfo = {
  algorithm: process.env.TOKEN_ALGORITHM || "HS256",
  issuer: process.env.TOKEN_ISSUER,
  audience: process.env.TOKEN_AUDIENCE,
  secretKey: process.env.TOKEN_SECRET_KEY,
  accessTokenValidity:
    parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC) ?? parseInt(3600),
  refreshTokenValidity:
    parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC) ?? parseInt(86400),
  accessSecretKey: process.env.JWT_ACCESS_SECRET_KEY,
  refreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY,
};

export const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  url: process.env.REDIS_CLOUD_URL,
};

export const cacheDuration = {
  contentCacheDuration: process.env.CONTENT_CACHE_DURATION ?? 600000,
};

export const extendedAccessTokenOptions = {
  httpOnly: true,
  secure: env === "production",
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000,
};

export const logDirectory = {
  logDir: process.env.LOG_DIR,
};
