import express from "express";
import JWT from "../config/generateToken.js";
import { tokenInfo } from "../config/constants.js";
import { validateTokenData } from "../config/token.utils.js";
import { User } from "../models/user.Schema.js";
import { Types } from "mongoose";
import { KeyStore } from "../models/keyStore.Schema.js";

const router = express.Router();

export default router.use(async (req, res, next) => {
  try {
    const payload = await JWT.verifyToken(
      req.cookies.accessToken,
      tokenInfo.secretKey
    );
    validateTokenData(payload);

    const user = await User.findById(new Types.ObjectId(payload.sub)).select(
      "-password"
    );
    if (!user) throw new Error("User does not exist");
    req.user = user;
    const keystore = await KeyStore.findOne({
      userId: req.user,
      primaryKey: payload.param,
      status: "true",
    });
    if (!keystore) throw new Error("Invalid access token");
    req.keystore = keystore;
    next();
  } catch (error) {
    return next(error);
  }
});
