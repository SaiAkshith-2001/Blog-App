import { tokenInfo } from "./constants.js";
import jwt from "./generateToken.js";
import { Types } from "mongoose";

export async function createToken(id, accessSecretKey, refreshSecretKey) {
  const generateAccessToken = await jwt.encodePayloadWithSecretKey(
    {
      iss: tokenInfo.issuer,
      aud: tokenInfo.audience,
      sub: id,
      param: accessSecretKey,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + tokenInfo.accessTokenValidity,
    },
    tokenInfo.secretKey
  );
  if (!generateAccessToken) throw new Error("Could not create access token");

  const generateRefreshToken = await jwt.encodePayloadWithSecretKey(
    {
      iss: tokenInfo.issuer,
      aud: tokenInfo.audience,
      sub: id,
      param: refreshSecretKey,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + tokenInfo.refreshTokenValidity,
    },
    tokenInfo.secretKey
  );
  if (!generateRefreshToken) throw new Error("Could not create refresh token");

  return {
    accessToken: generateAccessToken,
    refreshToken: generateRefreshToken,
  };
}

export const getAcessToken = (authorization) => {
  if (!authorization) throw new Error("No token provided");
  if (!authorization.startsWith("Bearer "))
    throw new Error("Invalid token format");
  const token = authorization.split(" ")[1];
  return token;
};

export const validateTokenData = (payload) => {
  if (
    !payload ||
    !payload.iss ||
    !payload.aud ||
    !payload.sub ||
    !payload.param ||
    payload.iss !== tokenInfo.issuer ||
    payload.aud !== tokenInfo.audience ||
    !Types.ObjectId.isValid(payload.sub)
  ) {
    throw new Error("Invalid token payload");
  }
  return true;
};
