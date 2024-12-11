import { Post } from "../models/post.Schema.js";
export const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json({
      status: "success",
      data: { post: newPost },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
export const readAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.json({
      status: "success",
      posts: allPosts,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
// /api/read/:id
export const readPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({
      _id: id,
    });
    res.json({
      status: "success",
      post: post,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: id,
    });
    res.json({
      status: "success",
      post: post,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// /api/read/user/name?author=Hiesenburg
export const readPostByAuthor = async (req, res) => {
  try {
    const author = req.query.author;
    const post = await Post.findOne({
      author: { $regex: author, $options: "i" },
    });
    res.json({
      status: "success",
      post: post,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
