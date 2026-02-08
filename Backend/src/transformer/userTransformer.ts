import { User } from "@prisma/client";
import { UserResponse } from "../dto/userDTO";

export class userTransformer {
  static createUserTransformer(data: User): UserResponse {
    return {
      id: data.id,
      email: data.email,
      username: data.username,
      createdAt: data.createdAt,
    };
  }
}
