import express from "express";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  login,
  register,
  updateUserById,
  deleteUserById,
  getUserProfileById,
} from "../controllers/userController.js";
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
router
  .route("/:id")
  .get(getUserProfileById)
  .patch(authMiddleware, updateUserById)
  .delete(authMiddleware, deleteUserById);

export default router;
