import express, { NextFunction, Request, Response } from "express";
import pingRouter from "./routes/ping";
import { env } from "./env";
import cors from "cors";
import weatherRouter from "./routes/weather";
import { ErrorResponse } from "@weather-app/types";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const app: express.Application = express();

app.use(express.json());
app.use(
  cors({
    origin: env.WEB_APP_URL,
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

app.use(express.json());
app.use("/ping", pingRouter);
app.use("/weather", weatherRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);

  const errorResponse: ErrorResponse = {
    message: "Internal server error",
    code: "INTERNAL_SERVER_ERROR",
  };

  res.status(500).json(errorResponse);
});

app.use((_req: Request, res: Response) => {
  const errorResponse: ErrorResponse = {
    message: "Resource not found",
    code: "NOT_FOUND",
  };

  res.status(404).json(errorResponse);
});

app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});
