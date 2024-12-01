import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectionDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DB_NAME}`
    );
    console.log("Connected to MongoDB", connectionInstance.connection.host);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
