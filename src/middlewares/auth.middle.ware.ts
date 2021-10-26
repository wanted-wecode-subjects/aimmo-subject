import express, { NextFunction } from "express";
import { ForbiddenError } from "../error/error";

export function auth(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  const { user } = req.session;
  if (!user)
    throw new ForbiddenError("로그인을 하지않으면 접근할 수 없습니다.");
  req.user = user;
  next();
}
