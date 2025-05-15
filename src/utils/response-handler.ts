import { Request, Response, NextFunction } from "express";

export function respondWithJSON(
  res: Response,
  statusCode: number,
  payload: any
) {
  res.status(statusCode).json({
    success: true,
    payload,
  });
}

export function respondWithError(
  res: Response,
  statusCode: number,
  message:any
) {
  res.status(statusCode).json({
    success: false,
    error: message,
  });
}
