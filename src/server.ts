import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";
import { authRouters } from "./auth/auth.routes";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";
import { usersRoutes } from "./modules/users/users.routes";
import { bookingsRoutes } from "./modules/bookings/bookings.routes";

const app = express();
const port = config.port;

app.use(express.json());

initDB();

app.get("/", async (req: Request, res: Response) => {
  // res.send("Server is working.")
  res.status(200).json({
    success: true,
    message: "Please try to use /api/v1 then the opeation.",
    note: "We are currently working on it. So, you will face some issue sometime. We hope you will try to understand.",
  });
});

app.get("/api/v1", async (req: Request, res: Response) => {
  res.json({
    health: "Ok",
    version: "v1",
    running: true,
    online: false,
    database: true,
    database_health: "Ok",
    messgae: "Welcome to Ordo Server. An vehicle rental management system.",
    status: 200,
    dev_mode: "Working...",
  });
});

app.use("/api/v1/auth", authRouters);
app.use("/api/v1/vehicles", vehiclesRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/bookings", bookingsRoutes);

app.listen(port, () => {
  console.log(`The Ordo Server is running now on Port: ${port}`);
});
