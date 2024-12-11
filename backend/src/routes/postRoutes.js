import express from "express";
import {
  createPost,
  readAllPosts,
  readPost,
  readPostByAuthor,
} from "../controllers/postController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.route("/write").post(createPost).get(readAllPosts).put(updatePost);
// router.get("/read");
// router.post("/write", authMiddleware, createPost);
router.route("/read/:id").get(readPost);
router.route("/read/user/name").get(readPostByAuthor);
export default router;
