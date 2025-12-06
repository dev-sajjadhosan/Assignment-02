import { pool } from "../../config/db";
import { getDate } from "../../helpers/timeFormatter";

const createBooking = async (payload: any) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id =$2`, [
    "booked",
    vehicle_id,
  ]);

  const vehicle = await pool.query(
    `SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );

  const total_price =
    (getDate(rent_end_date) - getDate(rent_start_date)) *
    vehicle.rows[0].daily_rent_price;

  const result = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  return { result, vehicle };
};

const getAllBookings = async () => {
  const result = await pool.query(`SELECT * FROM bookings`);
  const vehicle = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    result.rows[0].vehicle_id,
  ]);
  const customer = await pool.query(`SELECT * FROM users WHERE id=$1`, [
    result.rows[0].customer_id,
  ]);
  return { result, customer, vehicle };
};

const updateBookings = async (id: string | undefined, status: string) => {
  const updateState =
    status === "returned" || "cancelled" ? "available" : "booked";
  const result = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, id]
  );
  const vehicle = await pool.query(
    `UPDATE vehicles SET availability_status=$1 WHERE id =$2 RETURNING *`,
    [updateState, result.rows[0].vehicle_id]
  );
  return { result, vehicle };
};

export const bookingsServices = {
  createBooking,
  getAllBookings,
  updateBookings,
};
