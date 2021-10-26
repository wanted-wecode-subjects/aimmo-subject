import express, { Response } from "express";
import userRepository from "../repository/user.repository";
import { LOGIN_FAIL_CODE, PARAMENTER_ERROR_CODE } from "../util/errorCode";

export async function authenticate(
  req: express.Request,
  res: express.Response
) {
  const { id, password } = req.body;

  const user = await userRepository.authenticate(id, password);

  if (user) {
    req.session.user = user;
    res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
      },
    });
  } else {
    res.json({
      success: false,
      error: "아이디와 비밀번호가 일치하는 계정이 없습니다.",
      errorCode: LOGIN_FAIL_CODE,
    });
  }
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
export function getCurrentUser(req: express.Request, res: express.Response) {
  if (req.session.user) {
    const { id, name } = req.session.user;
    return res.json({
      success: true,
      data: {
        id,
        name,
      },
    });
  } else {
    res.json({
      success: false,
    });
  }
}

export default {
  authenticate,
  createUser,
  getCurrentUser,
};
