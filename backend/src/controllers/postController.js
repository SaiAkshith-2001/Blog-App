import {
  saveAllPostsToCache,
  getAllPostsFromCache,
  savePostToCache,
  getPostFromCache,
  invalidatePostCache,
} from "../cache/postsCache.js";
import { cacheDuration } from "../config/constants.js";
import { Post } from "../models/post.Schema.js";

export const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    await invalidatePostCache("AllPosts");
    res.status(201).json({
      status: "success",
      data: { post: newPost },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
export const readAllPosts = async (req, res) => {
  try {
    let allPosts = await getAllPostsFromCache("AllPosts");
    if (!allPosts) {
      allPosts = await Post.find();
      if (!allPosts || allPosts.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "No posts found",
        });
      }
      await saveAllPostsToCache(
        "AllPosts",
        allPosts,
        new Date(Date.now() + Number(cacheDuration.contentCacheDuration))
      );
    }
    res.status(200).json({
      status: "success",
      posts: allPosts,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
// /api/read/post/:id
export const readPostById = async (req, res) => {
  try {
    const id = req.params.id;
    let post = await getPostFromCache(id);
    if (!post) {
      post = await Post.findById({
        _id: id,
      });
      if (!post) {
        return res.status(404).json({
          status: "error",
          message: "No Post not found",
        });
      }
      await savePostToCache(
        id,
        post,
        new Date(Date.now() + Number(cacheDuration.contentCacheDuration))
      );
    }
    res.json({
      status: "success",
      post: post,
    });
  } catch (error) {
    res.status(500).json({
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
    res.status(500).json({
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
    res.status(500).json({
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
    res.status(200).json({
      status: "Post successfully updated",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
export const deletePostById = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost)
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    return res.status(200).json({
      status: "success",
      message: "Post successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);
// app.post("/api/askai", async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt,
//       maxTokens: 150,
//       // temperature: 0,
//     });
//     res.json({ message: response.data.choices[0].text });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
