import { model, Schema } from "mongoose";
export const Roles = {
  admin: "Admin",
  user: "User",
  guest: "Guest",
};
const roleSchema = new Schema(
  {
    role: { type: String, required: true, enum: Object.values(Roles) },
    status: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Role = model("Role", roleSchema);
