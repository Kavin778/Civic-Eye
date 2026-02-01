import { User } from "@prisma/client";
import { prisma } from "../config/db";
import { createUserType } from "../validator/userValidate";
import { HttpError } from "../error/HttpError";

export const createUserRepo = async (data: createUserType): Promise<User> => {
  try {
    const { email, password, username, phoneNo } = data;
    const response = await prisma.user.create({
      data: {
        email,
        password,
        username,
        phoneNo,
      },
    });
    return response;
  } catch (error) {
    throw new HttpError(422, "Unable to create the user");
  }
};

export const findUserByEmailRepo = async (
  email: string
): Promise<User | null> => {
  try {
    const response = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return response;
  } catch (error) {
    throw new HttpError(500, "Internal Server Error");
  }
};
