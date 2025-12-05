import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized! No token provided",
        });
      }

      const token = authHeader.split(" ")[1];

      let decoded: JwtPayload;
      try {
        decoded = verify(
          token as string,
          config.jwt_secret as string
        ) as JwtPayload;
      } catch (err: any) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token",
          error: err.message,
        });
      }

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! Access denied",
          errors: "Forbidden! Access denied",
        });
      }

      next();
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message,
        errors: err.message,
      });
    }
  };
};

export default auth;
