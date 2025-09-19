import { Role, ROLES } from "../models/role.Schema.js";

export const createRole = async (userId, role = ROLES.user, status = true) => {
  try {
    const roleCode = await Role.create({
      userId,
      role,
      status,
    });
    return roleCode;
  } catch (error) {
    console.error("something went wrong", error);
  }
};

export const getRole = async (role) => {
  try {
    const roleDoc = await Role.findOne({ role: role, status: true });
    if (!roleDoc) throw new Error("Invalid role provided");
    return roleDoc._id;
  } catch (error) {
    console.error("something went wrong", error);
  }
};
