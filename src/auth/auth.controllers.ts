import { Request, Response } from "express";
import { authServices } from "./auth.services";

const register = async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body;
  try {
    const result = await authServices.registerUser(
      name,
      email,
      password,
      phone,
      role
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authControllers = { register };
