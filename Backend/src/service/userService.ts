import { success } from "zod";
import { CacheKeys } from "../cache/cacheKeys";
import { CacheService } from "../cache/redisClient";
import { UserResponse, UserResponseDTO } from "../dto/userDTO";
import { HttpError } from "../error/HttpError";
import {
  createUserRepo,
  findUserByEmailRepo,
  findUserByIdRepo,
} from "../repo/userRepo";
import { userTransformer } from "../transformer/userTransformer";
import { createUserType, userIdType } from "../validator/userValidate";

export const createUserService = async (
  data: createUserType
): Promise<UserResponseDTO<UserResponse>> => {
  try {
    const isUserExists = await findUserByEmailRepo(data.email);
    if (isUserExists) {
      throw new HttpError(409, "User already exists");
    }
    const response = await createUserRepo(data);

    const transformedResponse = userTransformer.createUserTransformer(response);

    return {
      success: true,
      statusCode: 201,
      message: "User created successfully",
      data: transformedResponse,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError(500, "Internal Server Error");
  }
};

export const getUserService = async (data: userIdType):Promise<UserResponseDTO<UserResponse>> => {
  try {
    const cacheKey = CacheKeys.userById(data);

    const cachedResponse = await CacheService.get<UserResponse>(cacheKey);

    if (cachedResponse) {
      return {
        success: true,
        statusCode: 200,
        message: "User profile fetched successfully",
        data: cachedResponse,
      };
    }

    const dbResponse = await findUserByIdRepo(data);

    if (!dbResponse) {
      throw new HttpError(404, "User not found");
    }

    const transformedResponse =
      userTransformer.createUserTransformer(dbResponse);

    await CacheService.set(cacheKey, transformedResponse, 3600);

    return {
      success: true,
      statusCode: 200,
      message: "User profile fetched successfully",
      data: transformedResponse,
    };
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError(500, "Error while fetching user");
  }
};
