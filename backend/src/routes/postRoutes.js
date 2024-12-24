import express from "express";
import {
  createPost,
  readAllPosts,
  readPostById,
  readPostByAuthor,
  updatePostById,
  deletePostById,
  updatePostByIdPatch,
} from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.route("/write").post(authMiddleware, createPost).get(readAllPosts);
router.route("/read").get(readAllPosts);
router
  .route("/read/post/:id")
  .get(authMiddleware, readPostById)
  .put(authMiddleware, updatePostById)
  .patch(authMiddleware, updatePostByIdPatch)
  .delete(authMiddleware, deletePostById);
router.route("/read/user").get(readPostByAuthor);
export default router;
