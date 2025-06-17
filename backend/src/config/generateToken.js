import jwt from "jsonwebtoken";
export const generateAccessToken = (userId, username, email) => {
  return jwt.sign(
    {
      userId,
      username,
      email,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "10m",
    }
  );
};
