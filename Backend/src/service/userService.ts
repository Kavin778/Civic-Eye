import { IPVersion } from "node:net";
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
import { HashService } from "../utils/hash";
import { createUserType, userIdType } from "../validator/userValidate";
import { sessionCreationService } from "./authService";
import { authTransformer } from "../transformer/authTransformer";
import { prisma } from "../config/db";
import { createSessionRepo } from "../repo/authRepo";
import { generateAuthenticationTokens } from "../utils/tokenUtils";

export const createUserService = async (
  data: createUserType,
  userIp: string,
): Promise<UserResponseDTO<UserResponse>> => {
  try {
    const isUserExists = await findUserByEmailRepo(data.email);
    if (isUserExists) {
      throw new HttpError(409, "User already exists");
    }
    const hashService = new HashService();
    const hashedPassword = await hashService.passwordHash(data.password);

    const userData = { ...data, password: hashedPassword };

    return await prisma.$transaction(async (tx) => {
      const response = await createUserRepo(tx, userData);

      const payload = authTransformer.authTokenPayloadTransformer(response);

      const sessionResponse = await sessionCreationService(payload, userIp);

      await createSessionRepo(tx, sessionResponse);

      const tokens = generateAuthenticationTokens(payload);

      const transformedResponse = userTransformer.createUserTransformer(
        response,
        tokens,
      );

      return {
        success: true,
        statusCode: 201,
        message: "User created successfully",
        data: transformedResponse,
      };
    });
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError(500, "Internal Server Error");
  }
};

export const getUserService = async (
  data: userIdType,
): Promise<UserResponseDTO<UserResponse>> => {
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
      userTransformer.userProfileTransformer(dbResponse);

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
