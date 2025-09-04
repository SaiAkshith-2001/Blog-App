import mongoose, { Schema, model } from "mongoose";
const keyStoreSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    primaryKey: { type: String, required: true },
    secondaryKey: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: "keyStores",
  }
);

export const KeyStore = model("KeyStore", keyStoreSchema);
