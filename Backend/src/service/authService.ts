import { tokensType } from "../dto/authDTO";
import { HttpError } from "../error/HttpError";
import { createSessionRepo } from "../repo/authRepo";
import { authTransformer } from "../transformer/authTransformer";
import { tokenExpirationUtil } from "../utils/dateUtils";
import { HashService } from "../utils/hash";
import {
  generateAuthenticationTokens,
  verifyRefreshToken,
} from "../utils/tokenUtils";
import { payloadType, sessionType } from "../validator/authValidator";

export const sessionCreationService = async (
  payload: payloadType,
  userIp: string,
): Promise<sessionType> => {
  try {
    const tokens = generateAuthenticationTokens(payload);

    const hashService = new HashService();

    const hashedRefreshToken = await hashService.tokenHash(tokens.refreshToken);

    const decodedRefreshToken = verifyRefreshToken(tokens.refreshToken);

    const refreshTokenExpiration = tokenExpirationUtil(decodedRefreshToken.exp);

    const sessionTransformedData = authTransformer.sessionCreationTransformer(
      payload.userId,
      hashedRefreshToken,
      refreshTokenExpiration,
      userIp,
    );

    return sessionTransformedData;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError(400, "Failed to create session");
  }
};
