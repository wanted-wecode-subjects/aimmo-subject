import express, { Response } from "express";
import userRepository from "../repository/user.repository";
import { PARAMENTER_ERROR_CODE } from "../util/errorCode";

//curl -X POST -H "Content-Type: application/json" -d "{\"id\" : \"test\", \"password\": \"123\"}" http://localhost:8080/api/user/auth
export async function authenticate(
  req: express.Request,
  res: express.Response
) {
  const { id, password } = req.body;

  const user = await userRepository.authenticate(id, password);
  // todo: add session

  res.json({
    success: true,
  });
}
export async function createUser(req: express.Request, res: express.Response) {
  const { id, password, name } = req.body;
  if (id === undefined || password === undefined || name === undefined) {
    return res.json({
      success: false,
      error: "name parameter is required.",
      errorCode: PARAMENTER_ERROR_CODE,
    });
  }

  const newUser = await userRepository.createUser(id, password, name);
  res.json({
    success: true,
    data: newUser,
  });
}
export function getUser(req: express.Request, res: express.Response) {}

export default {
  authenticate,
  createUser,
  getUser,
};
