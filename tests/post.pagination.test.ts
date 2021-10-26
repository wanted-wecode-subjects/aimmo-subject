import "./connection";
import { getConnection } from "typeorm";
import { User } from "../src/model/user";
import {
  createPost,
  getPaginationPosts,
} from "../src/repository/post.repository";

describe("Post Pagination 테스트 ", () => {
  test("등록된 포스팅 리스팅 (5 개를 1 페이지로 다룰 때)", async () => {
    let author = new User();
    author.id = "test@123";
    author.password = "";
    author.name = "tester";

    const userRepository = getConnection().getRepository(User);
    await userRepository.save(author);

    await createPost("타이틀1입니다.", "내용입니다.", author);
    await createPost("타이틀2입니다.", "내용입니다.", author);
    await createPost("타이틀3입니다.", "내용입니다.", author);
    await createPost("타이틀4입니다.", "내용입니다.", author);

    const offset = 1;
    const limit = 5;
    const result = await getPaginationPosts(offset, limit);
    expect(result).not.toBeUndefined();
    expect(result.meta).toEqual({
      total: 1,
      offset: 1,
      limit: 5,
    });
    expect(result.posts.length).toBe(4);
  });
});
