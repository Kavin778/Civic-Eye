import { NextFunction, Request, Response } from "express";
import { HttpError } from "../error/HttpError";
import { verifyAccessToken } from "../utils/tokenUtils";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HttpError(401, "Unauthorizded request");
    }

    const token = authHeader.split(" ")[1];

    const { userId, role } = verifyAccessToken(token);

    req.user = { userId, role };

    next();
  } catch (error) {
    if (error instanceof HttpError) {
      next(error);
    }
    throw new HttpError(401, "Unauthorized request");
  }
};
