import { compare, hash } from "bcryptjs";

export const unhashPassword = async (password: string, hashPass: string) => {
  return await compare(password, hashPass);
};

export const hashPassword = async (password: string, salt: number = 10) => {
  return await hash(password, salt);
};
