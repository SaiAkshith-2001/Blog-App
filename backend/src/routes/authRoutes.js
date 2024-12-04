import express from "express";
import { body } from "express-validator";
import { login, register } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("username")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Username must be at least 6 characters"),
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .custom(async (value) => {
        const existingUser = await Users.findByEmail(value);
        if (existingUser) {
          throw new Error("A user already exists with this e-mail address");
        }
      }),
    body("password")
      .isLength({ min: 8 })
      .isUppercase({ min: 1 })
      .isLowercase({ min: 1 })
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

// // Token Refresh Route
// router.post("/refresh-token", authController.refreshToken);

// // Logout Route (protected)
// router.post("/logout", authMiddleware.verifyToken, authController.logout);

// // Get Profile Route (protected)
// router.get(
//   "/profile",
//   authMiddleware.verifyToken,
//   authController.getUserProfile
// );

export default router;
