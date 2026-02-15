import { tokensType } from "./authDTO";

export type UserResponse = {
  id: string;
  email: string;
  username: string;
  role: string;
  createdAt: Date;
};

export type signUpResponse = {
  id: string;
  email: string;
  username: string;
  role: string;
  createdAt: Date;
  accessToken: string;
  refreshToken: string;
};

export type UserResponseDTO<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};
