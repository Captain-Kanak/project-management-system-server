import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import { authRouter } from "./modules/auth/authRoute.js";
import { userRouter } from "./modules/user/userRoute.js";
import { projectRouter } from "./modules/project/projectRoute.js";

const app: Application = express();

app.use(json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://project-management-system-app-chi.vercel.app",
    ],
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Project Management System Server is running",
  });
});

app.use("/auth", authRouter);

app.use("/users", userRouter);

app.use("/projects", projectRouter);

app.use((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "404 Route not found",
    method: req.method,
    route: req.originalUrl,
  });
});

export default app;
