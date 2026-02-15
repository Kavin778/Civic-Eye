import { prisma } from "../config/db";
import { HttpError } from "../error/HttpError";
import { prismaTransaction } from "../types/prismaType";
import { sessionType } from "../validator/authValidator";

export const createSessionRepo = async (
  client: prismaTransaction,
  data: sessionType,
): Promise<boolean> => {
  try {
    await client.session.create({
      data: {
        token: data.token,
        ipAddress: data.ipAddress ?? null,
        expiresAt: data.expiresAt,
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });

    return true;
  } catch (error) {
    throw new HttpError(400, "Failed to create sesssion");
  }
};
