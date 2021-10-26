import { getConnection, Repository } from "typeorm";
import "./connection";

import { User } from "../src/model/user";
import { auth, createUser } from "../src/repository/user.repository";

describe("User 데이터베이스  테스트", () => {
  test("성공적인 User 생성 ", async () => {
    const created = await createUser("test@naver.com", "1q2w3e4r", "Tester");
    expect(created).toEqual({
      id: "test@naver.com",
      password: "1q2w3e4r",
      name: "Tester",
    });
  });
  test("id, password를 이용한 User 정보 조회", async () => {
    const created = await createUser("test@naver.com", "1q2w3e4r", "Tester");
    expect(created).not.toBeUndefined();

    const authedUser = await auth("test@naver.com", "1q2w3e4r");
    expect(authedUser).not.toBeUndefined();
    expect(authedUser).toEqual({
      name: "Tester",
      id: "test@naver.com",
      password: "1q2w3e4r",
    });
  });

  test("잘못된 id or password 를 이용한 User 정보 조회", async () => {
    const created = await createUser("test@naver.com", "1q2w3e4r", "Tester");
    expect(created).not.toBeUndefined();

    const authedUser = await auth("wrong@naver.com", "1q2w3e4r");
    expect(authedUser).toBeUndefined();
  });
});
