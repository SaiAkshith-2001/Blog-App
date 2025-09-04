import express from "express";
import { Role } from "../models/role.Schema.js";
const router = express.Router();

export default router.use(async (req, res, next) => {
  try {
    if (!req.user || !req.user.role || !req.currentRole) {
      return res.status(401).json({
        message: "forbidden error",
      });
    }
    const userRole = await Role.find({
      role: { $in: req.currentRole },
      status: true,
    });
    if (!userRole.length) {
      return res.status(401).json({
        message: "Unauthorized Permission Denied",
      });
    }

    const roleIds = userRole.map((role) => role._id.toString());
    let authorized = false;
    for (const userRoleI of req.user.role) {
      if (authorized) break;
      if (roleIds.includes(userRoleI.toString())) {
        authorized = true;
        break;
      }
    }
    if (!authorized) throw new Error("Permission Denied");
    next();
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
});
