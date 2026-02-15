import { User } from "@prisma/client";
import { signUpResponse, UserResponse } from "../dto/userDTO";
import { tokensType } from "../dto/authDTO";

export class userTransformer {
  static userProfileTransformer(data: User): UserResponse {
    return {
      id: data.id,
      email: data.email,
      username: data.username,
      role: data.role,
      createdAt: data.createdAt,
    };
  }

  static createUserTransformer(user: User, token: tokensType): signUpResponse {
    return {
      ...this.userProfileTransformer(user),
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };
  }
}
