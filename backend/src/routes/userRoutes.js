import express from "express";
import { body } from "express-validator";
// import { authMiddleware } from "../middlewares/authMiddleware.js";
import authentication from "../middlewares/authentication.js";
import authorization from "../middlewares/authorization.js";
import {
  login,
  logout,
  register,
  updateUserById,
  deleteUserById,
  getUserProfileById,
  refreshAccessToken,
} from "../controllers/userController.js";
import roles from "../helper/roles.js";
import { Roles } from "../models/role.Schema.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("username")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Username must be at least 6 characters"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  register
);

router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Invalid username address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);
router.post("/logout", logout);
router.post("/refresh-token", refreshAccessToken);
router
  .route("/profile/:id")
  .get(authentication, getUserProfileById)
  .patch(authentication, roles(Roles.user), authorization, updateUserById)
  .delete(authentication, roles(Roles.user), authorization, deleteUserById);

export default router;
