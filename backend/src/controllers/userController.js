import { User } from "../models/user.Schema.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { generateToken } from "../config/generateToken.js";
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
      refreshToken: generateToken(newUser._id),
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
        message: "Invalid credentials",
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
      refreshToken: generateToken(user._id),
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
    const user = await User.findById(req.params.id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({ data: user });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({
      message: "Server error fetching profile",
      error: error.message,
    });
  }
};

// const refreshToken = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;
//     const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(401).json({
//         message: "User not found",
//       });
//     }
//     if (user.refreshToken !== refreshToken) {
//       return res.status(401).json({
//         message: "Invalid refresh token",
//       });
//     }
//     const newAccessToken = jwt.sign(
//       {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "10m" }
//     );
//     res.json({
//       accessToken: newAccessToken,
//     });
//   } catch (error) {
//     if (error.name === "JsonWebTokenError") {
//       return res.status(401).json({
//         message: "Invalid refresh token",
//       });
//     }
//     res.status(500).json({
//       message: "Server error during token refresh",
//       error: error.message,
//     });
//   }
// };
// const logout = async (req, res) => {
//   try {
//     // Find user and clear refresh token
//     const user = await User.findById(req.user.id);
//     if (user) {
//       user.refreshToken = null;
//       await user.save();
//     }
//     // Clear client-side tokens would be handled by frontend
//     res.json({
//       message: "Logout successful",
//     });
//   } catch (error) {
//     console.error("Logout error:", error);
//     res.status(500).json({
//       message: "Server error during logout",
//       error: error.message,
//     });
//   }
// };
