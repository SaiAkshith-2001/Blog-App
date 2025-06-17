import { OAuth2Client } from "google-auth-library";
import { User } from "../models/user.Schema.js";

export const verifyGoogleOAuthToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied token is missing" });
    }
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, sub, name, picture } = payload;
    //  console.log({ email, sub, name, picture });
    let user = await User.findOne({ googleId: sub });
    if (!user) {
      user = new User({
        googleId: sub,
        email,
        username: email?.split("@")[0],
        name,
        profilePicture: picture,
        authType: "google",
      });
    }
    await user.save();
    next();
  } catch (error) {
    res.status(401).json({
      message: "invalid token!",
      error: error,
    });
    // next();
  }
};
