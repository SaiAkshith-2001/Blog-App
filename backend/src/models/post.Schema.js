import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true,index:true },
    author: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
      avatar: { type: String, default: null },
    },
    body: {
      category: { type: String },
      content: { type: String, required: true },
      interactions: {
        likes: {
          type: Number,
          default: 0,
        },
        comments: [
          {
            count: { type: Number, default: 0 },
            avatar: { type: String, default: null },
            username: {
              type: String,
            },
            content: {
              type: String,
            },
            createdAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
        shares: {
          type: Number,
          default: 0,
        },
      },
      tags: {
        type: [String],
        default: [],
      },
    },
  },
  { timestamps: true, collection: "posts" }
);
export const Post = mongoose.model("Post", postSchema);
