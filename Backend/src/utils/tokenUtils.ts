import { ENV } from "../config/env";
import { HttpError } from "../error/HttpError";
import {
  jwyType,
  payloadType,
  tokensSchema,
  tokensType,
  verifiedTokenSchema,
  verifiedTokenType,
} from "../validator/authValidator";
import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: payloadType): jwyType => {
  return jwt.sign(payload, ENV.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: payloadType): jwyType => {
  return jwt.sign(payload, ENV.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: jwyType): verifiedTokenType => {
  const payload = jwt.verify(token, ENV.JWT_ACCESS_SECRET);

  if (typeof payload === "string") {
    throw new HttpError(401, "Invalid token payload");
  }

  return verifiedTokenSchema.parse(payload);
};
export const verifyRefreshToken = (token: jwyType): verifiedTokenType => {
  const payload = jwt.verify(token, ENV.JWT_REFRESH_SECRET);

  if (typeof payload === "string") {
    throw new HttpError(401, "Invalid token payload");
  }

  return verifiedTokenSchema.parse(payload);
};

export const generateAuthenticationTokens = (
  payload: payloadType,
): tokensType => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const tokens = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  return tokensSchema.parse(tokens);
};
