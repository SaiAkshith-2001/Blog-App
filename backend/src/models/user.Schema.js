import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
export const UsingAuth = {
  google: "Google",
  local: "Local",
};

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

const userSchema = new Schema(
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
      match: [emailRegex, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: function () {
        return this.authType === "local";
      },
      match: [
        passwordRegex,
        "Password should contain atleast one Uppercase, one lowercase, a special character and a numeric value",
      ],
      minlength: 8,
    },
    googleId: { type: String, unique: true, sparse: true },
    authType: { type: String, enum: Object.values(UsingAuth) },
    profilePicture: { type: String },
    role: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
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

export const User = model("User", userSchema);
