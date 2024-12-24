import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    // author: {
    //   name: { type: String, required: true, trim: true },
    //   email: { type: String, required: true, trim: true },
    // },
    author: { type: String, required: true, trim: true },
    // body: {
    //   content: { type: String, required: true },
    //   interactions: {
    //     likes: {
    //       type: Number,
    //       default: 0,
    //     },
    //     comments: {
    //       type: Number,
    //       default: 0,
    //     },
    //     shares: {
    //       type: Number,
    //       default: 0,
    //     },
    //   },
    // },
    body: { type: String, required: true },
  },
  { timestamps: true, collection: "posts" }
);
export const Post = mongoose.model("Post", postSchema);
