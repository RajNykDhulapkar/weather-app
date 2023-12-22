import { Router, IRouter } from "express";
import { ApiResponse } from "@weather-app/types";

const pingRouter: IRouter = Router();

pingRouter.get<{}, ApiResponse<string>>("/", (_req, res) => {
  res.json({ message: "pong", data: "ok" });
});

export default pingRouter;
