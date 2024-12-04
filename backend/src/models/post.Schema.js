import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    body: { type: String, required: true },
  },
  { timestamps: true, collection: "posts" }
);
export const Post = mongoose.model("Post", postSchema);
