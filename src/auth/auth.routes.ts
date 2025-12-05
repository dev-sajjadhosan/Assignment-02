import { Router } from "express";
import { authControllers } from "./auth.controllers";

const router = Router();

router.post("/signup", authControllers.register);
router.get("/signin", authControllers.login);

export const authRouters = router;
