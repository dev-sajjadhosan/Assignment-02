import { Router } from "express";
import { vehicleControllers } from "./vehicles.controllers";
import auth from "../../middleware/auth";

const routes = Router();

routes.get("/", vehicleControllers.getAllVehicle);
routes.post("/", auth("admin"), vehicleControllers.createVehicle);
routes.get("/:vehicleId", vehicleControllers.getSingleVehicle);
routes.put("/:vehicleId", auth("admin"), vehicleControllers.updateVehicle);
routes.delete("/:vehicleId", auth("admin"), vehicleControllers.deleteVehicle);

export const vehicleRoutes = routes;
