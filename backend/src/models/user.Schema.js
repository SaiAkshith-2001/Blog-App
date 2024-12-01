import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, minlength: 6 },
    password: { type: String, required: true, minlength: 8 },
  },
  { timestamps: true, collection: "users" }
);
export const User = mongoose.model("User", userSchema);
