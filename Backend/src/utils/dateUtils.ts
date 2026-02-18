export const tokenExpirationUtil = (data: number): Date => {
  const expiresAt = new Date(data * 1000);
  return expiresAt;
};
