import express from "express";
import { body } from "express-validator";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/api/register",
  [
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),
    // body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  authController.register
);
router.post(
  "/api/login",
  [
    body("username").isEmail().withMessage("Invalid username address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  authController.login
);

// Token Refresh Route
router.post("/refresh-token", authController.refreshToken);

// Logout Route (protected)
router.post("/logout", authMiddleware.verifyToken, authController.logout);

// Get Profile Route (protected)
router.get(
  "/profile",
  authMiddleware.verifyToken,
  authController.getUserProfile
);

export default router;
