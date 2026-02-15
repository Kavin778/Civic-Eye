import { ENV } from "../config/env";
import argon2 from "argon2";

export class HashService {
  private readonly password_pepper = ENV.HASH_PEPPER;
  private readonly memoryCost = ENV.ARGON_MEMORY_COST;
  private readonly timeCost = ENV.ARGON_TIME_COST;
  private readonly token_pepper = ENV.JWT_REFRESH_HASH_PEPPER;

  async passwordHash(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,
      secret: Buffer.from(this.password_pepper),
      memoryCost: this.memoryCost,
      timeCost: this.timeCost,
      parallelism: 1,
    });
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return argon2.verify(password, hash, {
      secret: Buffer.from(this.password_pepper),
    });
  }

  async tokenHash(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,
      secret: Buffer.from(this.token_pepper),
      memoryCost: this.memoryCost,
      timeCost: this.timeCost,
      parallelism: 1,
    });
  }
}
