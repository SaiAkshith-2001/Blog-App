import express from "express";
import { createPost } from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post("/write", createPost);
router.get("/read");
// router.post("/write", authMiddleware, createPost);
export default router;
