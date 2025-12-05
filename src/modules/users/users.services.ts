import { pool } from "../../config/db";

const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const updateUser = async (id: string | undefined, body: any) => {
  const keys = Object.keys(body);
  const values = Object.values(body);

  const setString = keys.map((key, idx) => `${key}=$${idx + 1}`).join(", ");

  const result = await pool.query(
    `UPDATE users SET ${setString} WHERE id=$${keys.length + 1} RETURNING *`,
    [...values, id]
  );
  return result;
};

const deleteUser = async (id: string | undefined) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
  return result;
};

export const usersServices = { getAllUsers, updateUser, deleteUser };
