import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchmea = z.object({
  HASH_PEPPER: z.string().min(8, "Pepper should be atleast 8 characters"),
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.url(),
  ARGON_MEMORY_COST: z.coerce.number().default(65536),
  ARGON_TIME_COST: z.coerce.number().default(3),
  JWT_ACCESS_SECRET: z.string().min(3),
  JWT_REFRESH_SECRET: z.string().min(3),
  // JWT_ACCESS_EXPIRATION_TIME: z.string().min(1),
  // JWT_REFRESH_EXPIRATION_TIME: z.string().min(1),
  JWT_REFRESH_HASH_PEPPER: z.string().min(3),
});

export const ENV = envSchmea.parse(process.env);
