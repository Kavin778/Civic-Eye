import { User } from "@prisma/client";
import { CreateUserResponse } from "../dto/userDTO";

export class userTransformer {
  static createUserTransformer(data: User): CreateUserResponse {
    return {
      id: data.id,
      email: data.email,
      username: data.username,
      createdAt: data.createdAt,
    };
  }
}
