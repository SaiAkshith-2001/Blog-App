import { model, Schema } from "mongoose";
export const PERMISSION = {
  general: "General",
};
const apiKeySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    key: { type: String, required: true, unique: true, trim: true },
    permissions: {
      type: [
        {
          type: String,
          required: true,
          enum: Object.values(PERMISSION),
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

export const APIKey = model("APIKey", apiKeySchema);
