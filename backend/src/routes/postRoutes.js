import express from "express";
import {
  createPost,
  readAllPosts,
  readPostById,
  readPostByAuthor,
  updatePostById,
  deletePostById,
} from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.route("/write").post(createPost).get(readAllPosts);
router.route("/read").get(readAllPosts);
router
  .route("/read/post/:id")
  .get(readPostById)
  .put(updatePostById)
  .delete(deletePostById);
router.route("/read/user").get(readPostByAuthor);
export default router;
