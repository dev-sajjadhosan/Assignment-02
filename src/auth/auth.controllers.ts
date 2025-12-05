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
      errors: err,
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authServices.loginUser(email, password);
    if (result === null) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else if (result === false) {
      res.status(404).json({
        success: false,
        message: "Password not matched",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Login successful",
        data: result,
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

export const authControllers = { register, login };
