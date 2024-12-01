import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    title: { type: String },
    author: { type: String },
    body: { type: String },
  },
  { timestamps: true, collection: "posts" }
);
export const Post = mongoose.model("Post", postSchema);
