import jwt from "jsonwebtoken";
import { User } from "../models/user.Schema.js";
import dotenv from "dotenv";
dotenv.config();
import { verifyGoogleOAuthToken } from "./oauth.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided. Authorization denied.",
      });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.decode(token);
    if (decodedToken.iss && decodedToken.iss.includes("google")) {
      verifyGoogleOAuthToken(req, res, next);
    } else {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(401).json({
          message: "User not found. Authorization denied.",
        });
      }
      if (!user.isActive) {
        return res.status(403).json({
          message: "Account is inactive. Please contact support.",
        });
      }
      req.user = user;
      next();
    }
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token. Authorization denied.",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please log in again.",
      });
    }
    res.status(500).json({
      message: "Server error during authentication",
      error: error.message,
    });
  }
};

// Role-based Authorization Middleware
//     (authorizeRoles = (...allowedRoles) => {
//       return (req, res, next) => {
//         // Check if user exists and has a role
//         if (!req.user || !req.user.role) {
//           return res.status(403).json({
//             message: "Access denied. User role not defined.",
//           });
//         }
//         // Check if user's role is in the allowed roles
//         const isAllowed = allowedRoles.includes(req.user.role);
//         if (!isAllowed) {
//           return res.status(403).json({
//             message: `Access denied. Requires role: ${allowedRoles.join(
//               " or "
//             )}`,
//           });
//         }
//         next();
//       };
//     })
