import express from "express";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { login, register, deleteUser } from "../controllers/userController.js";
const router = express.Router();
// // GET all userss
// router.get("/", authMiddleware, getAllUsers);

// // GET user by ID
// router.get("/:id", authMiddleware, getUserById);

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

// // UPDATE user
// router.put("/:id", authMiddleware, updateUser);

// // DELETE user
router.delete("/:username", deleteUser);

export default router;
