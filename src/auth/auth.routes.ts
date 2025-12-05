import { Router } from "express";
import { authControllers } from "./auth.controllers";

const router = Router();

router.post("/auth/signup", authControllers.register);

export const authRouters = router;
