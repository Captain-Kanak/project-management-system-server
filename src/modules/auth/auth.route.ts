import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/login", authController.loginUser);

router.post("/invite");

router.post("/register-via-invite");

export { router as authRouter };
