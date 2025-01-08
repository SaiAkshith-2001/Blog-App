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
// /api/read/post/:id
export const readPostById = async (req, res) => {
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

// /api/read/user/name?author=Hiesenburg
export const readPostByAuthor = async (req, res) => {
  try {
    const author = req.query.author;
    const post = await Post.find({
      "author.name": { $regex: author, $options: "i" },
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
export const updatePostById = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    res.json({
      status: "Post successfully updated",
      post: updatedPost,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
export const updatePostByIdPatch = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.json({
      status: "Post successfully updated",
      post: updatedPost,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
export const deletePostById = async (req, res) => {
  try {
    const result = await Post.findByIdAndDelete(req.params.id, {
      runValidators: true,
      new: true,
    });
    res.json({
      status: "Post successfully deleted",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
