import path from "path";
import dotenv from "dotenv";
import initDB from "./db";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  jwt_secret: process.env.JWT_SECRET,
  port: process.env.PORT,
  connection_str: process.env.CONNECTION_STR,
};

export default config;
