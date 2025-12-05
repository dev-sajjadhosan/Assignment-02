import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(300) NOT NULL,
        email VARCHAR(300) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(20) NOT NULL,
        role userRole NOT NULL DEFAULT 'customer'
        CONSTRAINT role_check CHECK (role IN ('admin', 'customer'))
        )
        `);

  await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        CONSTRAINT vehicle_type CHECK (type IN ('car','bike','van','SUV')),
        registration_number TEXT UNIQUE NOT NULL,
        daily_rent_price NUMERIC(10, 2) NOT NULL CHECK (daily_rent_price  > 0),
        availability_status VARCHAR(20) NOT NULL DEFAULT 'available',
        CONSTRAINT avaliable_status CHECK (role In ('available','booked'))
        )
        `);

  await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
        total_price NUMERIC(10, 2) NOT NULL CHECK (total_price > 0),
        status VARCHAR(20) NOT NULL DEFAULT 'active',
        CONSTRAINT bookking_status CHECK (status IN ('active','cancelled','returned'))
        )
        `);
};

export default initDB;
