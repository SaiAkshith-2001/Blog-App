import fs from "fs";
import path from "path";
import { createLogger, transports, format } from "winston";
import { env, logDirectory } from "../config/constants.js";
import DailyRotateFile from "winston-daily-rotate-file";

let dir = logDirectory.logDir ?? "./src/logs";

if (!dir) dir = path.resolve("logs");

if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const logLevel = env === "development" ? "debug" : "warn";

const dailyRotateFile = new DailyRotateFile({
  level: logLevel,
  filename: `${dir}/%DATE%-results.log`,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  handleExceptions: true,
  maxFiles: "14d",
  maxSize: "20m",
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.json()
  ),
});
const logger = createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: format.combine(
        format.errors({ stack: true }),
        format.colorize(),
        format.prettyPrint()
      ),
    }),
    dailyRotateFile,
  ],
  exceptionHandlers: [dailyRotateFile],
  exitOnError: false,
});

export default logger;
