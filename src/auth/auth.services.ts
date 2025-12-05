import { Request } from "express";
import { pool } from "../config/db";

const registerUser = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  role: string
) => {
  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, password, phone, role]
  );
  return result;
};

const loginUser = async (payload: Record<string, unknown>) => {
  const { email, password } = payload;
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
};

export const authServices = { registerUser };
