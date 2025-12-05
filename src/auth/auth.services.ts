import { Request } from "express";
import { pool } from "../config/db";
import { hashPassword, unhashPassword } from "../helpers/handlePassword";
import { sign } from "jsonwebtoken";
import config from "../config";

const registerUser = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  role: string
) => {
  const hashPass = await hashPassword(password);

  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, hashPass, phone, role]
  );
  return result;
};

const loginUser = async (email: string, lpassword: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    return null;
  } else {
    const userResult: any = result.rows[0];
    const { password, ...user } = userResult;

    const matchPassword = await unhashPassword(lpassword, userResult.password);

    if (!matchPassword) {
      return false;
    } else {
      const token = sign(user, config.jwt_secret as string, {
        expiresIn: "7d",
      });

      return { token, user };
    }
  }
};

export const authServices = { registerUser, loginUser };
