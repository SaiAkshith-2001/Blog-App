import express from "express";
import {
  createPost,
  readAllPosts,
  readPostById,
  readPostByAuthor,
  updatePostById,
  deletePost,
} from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.route("/write").post(createPost).get(readAllPosts);
router.route("/read").get(readAllPosts);
router.route("/read/post/:id").get(readPostById).put(updatePostById);
router.route("/read/post/:title").delete(deletePost);
router.route("/read/user/name").get(readPostByAuthor);
export default router;
