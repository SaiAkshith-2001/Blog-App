import { model, Schema } from "mongoose";
export const ROLES = {
  admin: "Admin",
  user: "User",
  guest: "Guest",
};
const roleSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    role: { type: String, required: true, enum: Object.values(ROLES) },
    status: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "roles",
  }
);

export const Role = model("Role", roleSchema);
