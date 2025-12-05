import express, { Request, Response } from "express";
import config from "./config";
import { authRouters } from "./auth/auth.routes";
import initDB, { pool } from "./config/db";
import { vehicleRoutes } from "./modules/vehicles/vehicles.routes";

const app = express();
const port = config.port;

app.use(express.json());

initDB();

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
app.use("/api/v1/vehicles", vehicleRoutes);

app.listen(port, () => {
  console.log(`The Ordo Server is running now on Port: ${port}`);
});
