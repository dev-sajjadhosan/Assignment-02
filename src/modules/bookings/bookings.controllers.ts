import { Request, Response } from "express";
import { bookingsServices } from "./bookings.services";
import { getTimeFormate } from "../../helpers/timeFormatter";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.createBooking(req.body);
    const data = result.result.rows[0];
    const start_date = getTimeFormate(data.rent_start_date);
    const end_date = getTimeFormate(data.rent_end_date);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: {
        ...result.result.rows[0],
        rent_start_date: start_date,
        rent_end_date: end_date,
        vehicle: { ...result.vehicle.rows[0] },
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      messgae: err.message,
      errors: err,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const role = req.user?.role;
    console.log(req.user);
    const result = await bookingsServices.getAllBookings(role, req.user?.id);
    console.log(result);
    res.status(200).json({
      success: true,
      message:
        role === "admin"
          ? "Bookings retrieved successfully"
          : "Your bookings retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      errors: err,
    });
  }
};

const updateBookings = async (req: Request, res: Response) => {
  try {
    const role = req.user?.role;
    const { status } = req.body;
    if (role === "admin") {
      const result = await bookingsServices.updateBookings(
        req.params.bookingId,
        status
      );
      res.status(200).json({
        success: true,
        message: "Booking marked as returned. Vehicle is now available",
        data: {
          ...result.result.rows,
          rent_start_date: getTimeFormate(
            result.result.rows[0].rent_start_date
          ),
          rent_end_date: getTimeFormate(result.result.rows[0].rent_end_date),
          vehicle: {
            availability_status: result.vehicle.rows[0].availability_status,
          },
        },
      });
    } else {
      const result = await bookingsServices.updateBookings(
        req.params.bookingId,
        status
      );
      res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: {
          ...result.result.rows[0],
          rent_start_date: getTimeFormate(
            result.result.rows[0].rent_start_date
          ),
          rent_end_date: getTimeFormate(result.result.rows[0].rent_end_date),
        },
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      errors: err,
    });
  }
};

export const bookingsControllers = {
  createBooking,
  getAllBookings,
  updateBookings,
};
