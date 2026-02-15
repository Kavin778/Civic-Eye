import { z } from "zod";

export const payloadSchema = z.object({
  userId: z.cuid(),
  role: z.enum(["USER", "ADMIN"]),
});

export type payloadType = z.infer<typeof payloadSchema>;

export const jwtSchema = z.jwt({ message: "Invalid or malformed token" });

export type jwyType = z.infer<typeof jwtSchema>;

export const verifiedTokenSchema = z.object({
  userId: z.cuid(),
  role: z.enum(["USER", "ADMIN"]),
  iat: z.number(),
  exp: z.number(),
});

export type verifiedTokenType = z.infer<typeof verifiedTokenSchema>;

export const tokensSchema = z.object({
  accessToken: z.jwt(),
  refreshToken: z.jwt(),
});

export type tokensType = z.infer<typeof tokensSchema>;

export const sessionSchema = z.object({
  userId: z.cuid(),
  token: z.string(),
  ipAddress: z.union([z.ipv4(), z.ipv6()]).optional(),
  expiresAt: z.date(),
});

export type sessionType = z.infer<typeof sessionSchema>;
