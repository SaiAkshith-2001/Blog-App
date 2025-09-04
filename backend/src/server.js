import dotenv from "dotenv";
import app from "./index.js";
import { port } from "./config/constants.js";
import logger from "./core/logger.js";

dotenv.config();
app.listen(port, () => {
  console.log(`server running on port: ${port}`);
  // logger.info(`server running on port: ${port}`);
});
