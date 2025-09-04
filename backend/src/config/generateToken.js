import jwt from "jsonwebtoken";
import { tokenInfo } from "./constants.js";

// export const JWTPayload = ({ issuer, audience, subject, param, validity }) => {
//   return {
//     iss: issuer,
//     aud: audience,
//     sub: subject,
//     param: param,
//     iat: Math.floor(Date.now() / 1000),
//     exp: Math.floor(Date.now() / 1000) + validity,
//   };
// };

const encodePayloadWithSecretKey = async (payload, secret) => {
  if (!secret) throw new Error("Secret key is required for signing the token");
  const options = {
    algorithm: tokenInfo.algorithm,
  };
  try {
    return new Promise((resolve, reject) => {
      jwt.sign({ ...payload }, secret, options, (err, token) => {
        if (err) return reject(err);
        resolve(token);
      });
    });
  } catch (error) {
    throw new Error("Error in encoding the token: ", error.message);
  }
};

const decodePayload = (token) => {
  if (!token) throw new Error("Token is required for decoding");
  try {
    const decodeToken = jwt.decode(token);
    if (!decodeToken) throw new Error("Invalid token");
    return decodeToken;
  } catch (error) {
    throw new Error("Error in decoding the token: ", error.message);
  }
};

const verifyToken = (token, secret) => {
  try {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });
  } catch (error) {
    throw new Error("Error in validating the token: ", error.message);
  }
};

export default {
  encodePayloadWithSecretKey,
  decodePayload,
  verifyToken,
};
