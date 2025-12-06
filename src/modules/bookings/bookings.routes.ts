import { Router } from "express";
import auth from "../../middleware/auth";
import { bookingsControllers } from "./bookings.controllers";

const routes = Router();

routes.get("/", auth("admin", "customer"), bookingsControllers.getAllBookings);
routes.post("/", bookingsControllers.createBooking);
routes.put(
  "/:bookingId",
  auth("admin", "customer"),
  bookingsControllers.updateBookings
);

export const bookingsRoutes = routes;
