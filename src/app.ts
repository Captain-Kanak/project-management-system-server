import express, { Application, json, Request, Response } from "express";

export const app: Application = express();

app.use(json());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Project Management System Server is running",
  });
});

app.get("/api", (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to the Project Management System - API Route",
  });
});

app.use((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "404 Route not found",
    method: req.method,
    originalUrl: req.originalUrl,
  });
});
