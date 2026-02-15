import { Request, Response, NextFunction } from "express";
import { createUserSchema, userIdSchema } from "../validator/userValidate";
import { createUserService, getUserService } from "../service/userService";
import { success } from "zod";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userIp = req.ip!;
    const validatedRequest = createUserSchema.parse(req.body);
    const response = await createUserService(validatedRequest, userIp);

    res.status(response.statusCode).json({
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
};
//getting the user profile
export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const validatedRequest = userIdSchema.parse(userId);
    const response = await getUserService(validatedRequest);

    res.status(response.statusCode).json({
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
};
