import { getConnection } from "typeorm";
import { User } from "../model/user";

export async function createUser(
  username: string,
  password: string
): Promise<User> {
  const userRepository = getConnection().getRepository(User);
  let user = new User();
  user.username = username;
  user.password = password;

  return await userRepository.save(user);
}

export async function authenticate(username: string, password: string) {
  const userRepository = getConnection().getRepository(User);
  const user = await userRepository.findOne({ username });
  if (user && user.password === password) {
    return user;
  } else {
    return undefined;
  }
}

export default {
  createUser,
  authenticate,
};
