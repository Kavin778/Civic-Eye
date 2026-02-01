export type CreateUserResponse = {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
};

export type UserResponseDTO<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};
