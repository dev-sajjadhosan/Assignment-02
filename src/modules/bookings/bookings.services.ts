import { pool } from "../../config/db";
import { getDate, getTimeFormate } from "../../helpers/timeFormatter";

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

const getAllBookings = async (role: "admin" | "customer", userId?: number) => {
  let query = `
    SELECT 
      b.id AS booking_id,
      b.customer_id,
      b.vehicle_id,
      b.rent_start_date,
      b.rent_end_date,
      b.total_price,
      b.status,

      u.name AS customer_name,
      u.email AS customer_email,

      v.vehicle_name,
      v.type,
      v.registration_number
    FROM bookings b
    JOIN users u ON b.customer_id = u.id
    JOIN vehicles v ON b.vehicle_id = v.id
  `;
  const params: any[] = [];

  if (role === "customer") {
    query += ` WHERE b.customer_id = $1`;
    params.push(userId);
  }

  const { rows } = await pool.query(query, params);

  const formatted = rows.map((row) => {
    const base: any = {
      id: row.booking_id,
      customer_id: row.customer_id,
      vehicle_id: row.vehicle_id,
      rent_start_date: getTimeFormate(row.rent_start_date),
      rent_end_date: getTimeFormate(row.rent_end_date),
      total_price: row.total_price,
      status: row.status,
      vehicle: {
        vehicle_name: row.vehicle_name,
        registration_number: row.registration_number,
        type: row.type,
      },
    };
    if (role === "admin") {
      base.customer = {
        name: row.customer_name,
        email: row.customer_email,
      };
    }
    return base;
  });

  return formatted;
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
