import express from "express";
// import {
// //   getAllUsers,
// //   getUserById,
// //   createUser,
// //   updateUser,
// //   deleteUser,
// } from "../controllers/userController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createUser } from "../controllers/userController.js";
import { login } from "../controllers/authController.js";
const router = express.Router();

// // GET all userss
// router.get("/", authMiddleware, getAllUsers);

// // GET user by ID
// router.get("/:id", authMiddleware, getUserById);

// // CREATE new user
router.post("/register", createUser);
router.post("/login", login);

// // UPDATE user
// router.put("/:id", authMiddleware, updateUser);

// // DELETE user
// router.delete("/:id", authMiddleware, deleteUser);

export default router;
