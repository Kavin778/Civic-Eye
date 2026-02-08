import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters" })
    .trim(),
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters" })
    .trim(),
  phoneNo: z.string().min(10, { message: "Enter valid phone number" }),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

export type createUserType = z.infer<typeof createUserSchema>;

export const userIdSchema = z.cuid({ message: "Invalid CUID" });

export type userIdType = z.infer<typeof userIdSchema>;
