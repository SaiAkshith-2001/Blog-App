import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
import { connectionDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { frontendUrl } from "./config/constants.js";
import redisCache from "./cache/redis.cache.js";
import swaggerDocs from "./utils/swagger.js";
import logger from "./core/logger.js";
// import { Configuration, OpenAIApi } from "openai"

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(limiter);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api-docs", swaggerDocs);
redisCache.connectRedis();

process.on("SIGINT", async () => {
  await redisCache.client.quit();
  process.exit(0);
});

connectionDB().catch((error) => console.error(error));
export default app;
