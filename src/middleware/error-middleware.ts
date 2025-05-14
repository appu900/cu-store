import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error";

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";
  console.error(`[${req.method}] ${req.url} - ${message}`);
  res.status(statusCode).json({
    success: false,
    message,
  });
};
