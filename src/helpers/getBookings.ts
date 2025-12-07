import { pool } from "../config/db";

export const getBookings = async (id: string | undefined) => {
  const result = await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [id]);
  return result.rows;
};
