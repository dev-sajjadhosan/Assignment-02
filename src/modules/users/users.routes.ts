import { Router } from "express";
import { usersControllers } from "./users.controllers";
import auth from "../../middleware/auth";

const routes = Router();

routes.get("/", auth("admin"), usersControllers.getAllUsers);
routes.put("/:userId", auth("admin", "customer"), usersControllers.updateUser);
routes.delete("/:userId", auth("admin"), usersControllers.deleteUser);

export const usersRoutes = routes;
