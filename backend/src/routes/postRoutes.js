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
// import { authMiddleware } from "../middlewares/authMiddleware.js";
// import { paginationMiddleware } from "../middlewares/paginationMiddleware.js";
// import { Post } from "../models/post.Schema.js";
import authentication from "../middlewares/authentication.js";
import authorization from "../middlewares/authorization.js";
import { Roles } from "../models/role.Schema.js";
import roles from "../helper/roles.js";

const router = express.Router();

router
  .route("/write")
  .post(authentication, roles(Roles.user), authorization, createPost);

// router.route("/read").get(paginationMiddleware(Post), (req, res) => {
//   res.json(res.paginatedResults);
// });

router
  .route("/read")
  .get(authentication, roles(Roles.user), authorization, readAllPosts);

router
  .route("/read/post/:id")
  .get(authentication, readPostById)
  .put(authentication, roles(Roles.user), authorization, updatePostById)
  .patch(authentication, roles(Roles.user), authorization, updatePostByIdPatch)
  .delete(authentication, roles(Roles.user), authorization, deletePostById);

router.route("/read/user").get(readPostByAuthor);

// router.route("/write").post(authMiddleware, createPost).get(readAllPosts);
// router.route("/read").get(paginationMiddleware(Post), (req, res) => {
//   res.json(res.paginatedResults);
// });
// router
//   .route("/read")
//   .get(authentication, roles(Roles.user), authorization, readAllPosts);
// router
//   .route("/read/post/:id")
//   .get(authMiddleware, readPostById)
//   .put(authMiddleware, updatePostById)
//   .patch(authMiddleware, updatePostByIdPatch)
//   .delete(authMiddleware, deletePostById);
// router.route("/read/user").get(readPostByAuthor);

export default router;
