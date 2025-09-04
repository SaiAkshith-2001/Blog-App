import mongoose from "mongoose";
import { dbConfig } from "./constants.js";
export const connectionDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${dbConfig.url}/${dbConfig.name}`
    );
    console.log("Connected to MongoDB", connectionInstance.connection.host);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
