import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
export const Permission = {
  general: "General",
};
const apiKeySchema = new Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    permissions: {
      type: [
        {
          type: String,
          required: true,
          enum: Object.values(Permission),
        },
      ],
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "apiKeys",
  }
);

apiKeySchema.methods.compareKey = function (key) {
  return bcrypt.compare(key, this.key);
};
export const APIKey = model("APIKey", apiKeySchema);
