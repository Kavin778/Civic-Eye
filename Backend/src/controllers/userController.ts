import { Request, Response, NextFunction } from "express";
import { createUserSchema } from "../validator/userValidate";
import { createUserService } from "../service/userService";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedRequest = createUserSchema.parse(req.body);
    const response = await createUserService(validatedRequest);

    res.status(response.statusCode).json({
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
};
