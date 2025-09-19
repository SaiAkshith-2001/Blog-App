import { User } from "../models/user.Schema.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { tokenInfo, env } from "../config/constants.js";
import crypto from "crypto";
import { createKeyStores } from "./keyStoreController.js";
import { createToken, validateTokenData } from "../config/token.utils.js";
import JWT from "../config/generateToken.js";
import { Types } from "mongoose";
import { KeyStore } from "../models/keyStore.Schema.js";
import { createRole, getRole } from "./roleController.js";
import { ROLES } from "../models/role.Schema.js";
import { PERMISSION } from "../models/apiKey.Schema.js";
import { createApiKey } from "./apiKeyController.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { username, email, password } = req.body;
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
      role: [await getRole(ROLES.user, ROLES.admin)],
      isActive: true,
    });
    await newUser.save();
    const roleCodeExtended = ROLES.user;
    const isActive = true;
    await createRole(newUser._id, roleCodeExtended, isActive);

    const generateApiKey = crypto.randomBytes(32).toString("hex");
    const saltRounds = 10;
    const generateHashedApiKey = await bcrypt.hash(generateApiKey, saltRounds);
    const permissionExtended = PERMISSION.general;
    const status = true;
    console.log(
      `generateApiKey: ${generateApiKey}, ${permissionExtended}, ${status}`
    );
    await createApiKey(
      newUser._id,
      generateHashedApiKey,
      permissionExtended,
      status
    );
    if (newUser) {
      const accessTokenKey = crypto.randomBytes(64).toString("hex");
      const refreshTokenKey = crypto.randomBytes(64).toString("hex");
      await createKeyStores(newUser._id, accessTokenKey, refreshTokenKey);
      const tokens = await createToken(
        newUser._id,
        accessTokenKey,
        refreshTokenKey
      );
      res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: env === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: env === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    } else {
      throw new Error("invalid credentials");
    }
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
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
    const user = await User.findOne({ username }).populate("role");
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
    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");
    await createKeyStores(user._id, accessTokenKey, refreshTokenKey);
    const tokens = await createToken(user._id, accessTokenKey, refreshTokenKey);

    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: env === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: env === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error during login",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: env === "production",
      sameSite: "strict",
      path: "/",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: env === "production",
      sameSite: "strict",
      path: "/",
    });
    res.status(200).json({
      authenticated: false,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
};

export const refreshAccessToken = async (req, res) => {
  const decodedAccessTokenPayload = JWT.decodePayload(req.cookies.accessToken);
  validateTokenData(decodedAccessTokenPayload);

  const user = await User.findById(
    new Types.ObjectId(decodedAccessTokenPayload.sub)
  ).select("-password");

  if (!user) throw new Error("User not registered");
  req.user = user;

  const decodedRefreshTokenPayload = await JWT.verifyToken(
    req.cookies.refreshToken,
    tokenInfo.secretKey
  );
  validateTokenData(decodedRefreshTokenPayload);

  if (decodedAccessTokenPayload.sub !== decodedRefreshTokenPayload.sub) {
    throw new Error("Invalid token pair");
  }
  const keyStore = await KeyStore.findOne({
    userId: user._id,
    primaryKey: decodedAccessTokenPayload.param,
    secondaryKey: decodedRefreshTokenPayload.param,
  });
  if (!keyStore) throw new Error("No matching key store found");

  await KeyStore.deleteOne({
    userId: user._id,
    primaryKey: decodedAccessTokenPayload.param,
    secondaryKey: decodedRefreshTokenPayload.param,
  });

  const accessTokenKey = crypto.randomBytes(64).toString("hex");
  const refreshTokenKey = crypto.randomBytes(64).toString("hex");
  await createKeyStores(user._id, accessTokenKey, refreshTokenKey);
  const tokens = await createToken(user._id, accessTokenKey, refreshTokenKey);
  res.cookie("accessToken", tokens.accessToken, {
    httpOnly: true,
    secure: env === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    message: "Access Token refreshed",
  });
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
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id, {
      runValidators: true,
      new: true,
    });
    res.json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getUserProfileById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ username: id })
      .select("-password")
      .populate("role");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({
      message: "Server error fetching profile",
      error: error.message,
    });
  }
};
