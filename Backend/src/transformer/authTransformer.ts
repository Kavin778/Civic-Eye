import { Role, User } from "@prisma/client";
import { tokensType } from "../dto/authDTO";
import { jwyType, payloadType, sessionType } from "../validator/authValidator";

export class authTransformer {
  static authTokenPayloadTransformer(user: User): payloadType {
    return {
      userId: user.id,
      role: user.role,
    };
  }

  static sessionCreationTransformer(
    userId: string,
    token: string,
    expiresAt: Date,
    ipAddress: string,
  ): sessionType {
    return {
      userId: userId,
      token: token,
      expiresAt: expiresAt,
      ipAddress: ipAddress,
    };
  }
}
