import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: function () {
        return this.authType === "local";
      },
      minlength: 8,
    },
    googleId: { type: String, unique: true, sparse: true },
    authType: { type: String, enum: ["local", "google"] },
    profilePicture: { type: String },
    role: {
      type: String,
      enum: ["User", "Admin", "Guest"],
      default: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, collection: "users" }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

export const User = mongoose.model("User", userSchema);
