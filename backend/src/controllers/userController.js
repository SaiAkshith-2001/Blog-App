import { User } from "../models/user.Schema.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { generateAccessToken } from "../config/generateToken.js";
export const register = async (req, res) => {
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
    const newUser = new User({
      username,
      password,
      email,
      role: role || "user",
      isActive: true,
    });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      token: generateAccessToken(newUser._id, newUser.username, newUser.email),
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Server error during registration",
      error: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "Username is not registered",
      });
    }
    if (!user.isActive) {
      return res.status(403).json({
        message: "Account is inactive. Contact support.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token: generateAccessToken(user._id, user.username, user.email),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error during login",
      error: error.message,
    });
  }
};
export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        email: req.body.email,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    res.json({
      status: "User successfully updated",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id, {
      runValidators: true,
      new: true,
    });
    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getUserProfileById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ username: id }).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({
      message: "Server error fetching profile",
      error: error.message,
    });
  }
};
