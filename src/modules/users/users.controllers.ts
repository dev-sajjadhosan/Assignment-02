import { Request, Response } from "express";
import { usersServices } from "./users.services";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.getAllUsers();

    if (result.rows.length === 0) {
      res.status(200).json({
        success: true,
        message: "No users exist",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message, errors: err });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await usersServices.updateUser(req.params.userId, req.body);

    if (result.rows.length === 0) {
      res.status(200).json({
        success: true,
        message: "User not found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      messgae: err.message,
      errors: err,
    });
  }
};

export const usersControllers = { getAllUsers, updateUser };
