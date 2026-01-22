import express, { Application, json, Request, Response } from "express";
import { authRouter } from "./modules/auth/auth.route";
import { userRouter } from "./modules/user/user.route";

export const app: Application = express();

app.use(json());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Project Management System Server is running",
  });
});

app.use("/auth", authRouter);

app.use("/users", userRouter);

app.use((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "404 Route not found",
    method: req.method,
    originalUrl: req.originalUrl,
  });
});
