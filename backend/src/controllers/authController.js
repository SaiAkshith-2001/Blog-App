import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const authController = {
  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      const { username, email, password, role } = req.body;
      let existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser) {
        return res.status(400).json({
          message: "User already exists with this email or username",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        role: role || "user",
        isActive: true,
      });
      await newUser.save();
      const accessToken = jwt.sign(
        {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
      );
      const refreshToken = jwt.sign(
        { id: newUser._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );
      // Respond with user and tokens
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({
        message: "Server error during registration",
        error: error.message,
      });
    }
  },
  // User Login
  login: async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      const { username, password } = req.body;
      // Find user
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
      // Check if user is active
      if (!user.isActive) {
        return res.status(403).json({
          message: "Account is inactive. Contact support.",
        });
      }
      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
      // Generate tokens
      const accessToken = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
      );
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );
      // Update user with refresh token (optional)
      user.refreshToken = refreshToken;
      await user.save();
      // Respond with tokens
      res.json({
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        message: "Server error during login",
        error: error.message,
      });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }
      if (user.refreshToken !== refreshToken) {
        return res.status(401).json({
          message: "Invalid refresh token",
        });
      }
      const newAccessToken = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
      );
      res.json({
        accessToken: newAccessToken,
      });
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          message: "Invalid refresh token",
        });
      }
      res.status(500).json({
        message: "Server error during token refresh",
        error: error.message,
      });
    }
  },
  logout: async (req, res) => {
    try {
      // Find user and clear refresh token
      const user = await User.findById(req.user.id);
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
      // Clear client-side tokens would be handled by frontend
      res.json({
        message: "Logout successful",
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({
        message: "Server error during logout",
        error: error.message,
      });
    }
  },
  getUserProfile: async (req, res) => {
    try {
      // Fetch user details excluding password
      const user = await User.findById(req.user.id).select(
        "-password -refreshToken"
      );
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      res.json(user);
    } catch (error) {
      console.error("Profile fetch error:", error);
      res.status(500).json({
        message: "Server error fetching profile",
        error: error.message,
      });
    }
  },
};
