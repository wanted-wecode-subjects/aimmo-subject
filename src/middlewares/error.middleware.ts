import { Request, Response, NextFunction } from "express";

export default function errorControl(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = null;

  if (!statusCode) {
    statusCode = 500;
    next(err);
  }
  const message = err.message;
  res.status(statusCode).send({ status: statusCode, message: message });
}
