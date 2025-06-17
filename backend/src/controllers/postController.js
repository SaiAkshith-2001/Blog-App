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
    const post = await Post.findById({
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
    const existingPost = await Post.findById(req.params.id);
    if (!existingPost) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          "author.email": req.body.author.email,
          "author.name": req.body.author.name,
          "author.avatar": req.body.author.avatar,
          "body.tags": req.body.body.tags,
          "body.category": req.body.body.category,
          "body.content": req.body.body.content,
          // "body.interactions.likes": req.body.body.likes,
          // "body.interactions.shares": req.body.body.shares,
          // comments: {
          //   count: req.body.count,
          //   username: req.body.username,
          //   content: req.body.comments.content,
          // },
        },
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
