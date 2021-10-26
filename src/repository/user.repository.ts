import { getConnection } from "typeorm";
import { User } from "../model/user";

export async function createUser(
  id: string,
  password: string,
  name: string
): Promise<User> {
  const userRepository = getConnection().getRepository(User);
  let user = new User();
  user.id = id;
  user.name = name;
  user.password = password;

  return await userRepository.save(user);
}

export async function authenticate(id: string, password: string) {
  const userRepository = getConnection().getRepository(User);
  const user = userRepository.findOne({ id, password });
  return user;
}

export default {
  createUser,
  authenticate,
};
