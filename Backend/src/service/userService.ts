import { CreateUserResponse, UserResponseDTO } from "../dto/userDTO";
import { HttpError } from "../error/HttpError";
import { createUserRepo, findUserByEmailRepo } from "../repo/userRepo";
import { userTransformer } from "../transformer/userTransformer";
import { createUserType } from "../validator/userValidate";

export const createUserService = async (
  data: createUserType
): Promise<UserResponseDTO<CreateUserResponse>> => {
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
