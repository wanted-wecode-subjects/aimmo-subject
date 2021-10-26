import { getConnection } from "typeorm";
import "./connection";

import { User } from "../src/model/user";
import {
  createPost,
  deletePost,
  getPaginationPosts,
  getPost,
  updatePost,
} from "../src/repository/post.repository";

describe("Post 데이터베이스 테스트", () => {
  test("성공적인 Post 생성하기", async () => {
    let author = new User();
    author.id = "test@123";
    author.password = "";
    author.name = "tester";
    const userRepository = getConnection().getRepository(User);
    await userRepository.save(author);
    const createdPost = await createPost(
      "타이틀입니다.",
      "내용입니다.",
      author
    );
    expect(createdPost).not.toBeUndefined();
    expect(createdPost.id).not.toBeUndefined();
  });

  test("Post 수정하기", async () => {
    let author = new User();
    author.id = "test@123";
    author.password = "";
    author.name = "tester";
    const userRepository = getConnection().getRepository(User);
    await userRepository.save(author);

    const createdPost = await createPost(
      "타이틀입니다.",
      "내용입니다.",
      author
    );

    expect(createdPost).not.toBeUndefined();
    expect(createdPost.id).not.toBeUndefined();

    const updatedPost = await updatePost(
      createdPost.id,
      "수정된 타이틀",
      "수정된 내용입니다."
    );

    if (updatedPost === undefined) fail("도달할 수 없는 테스트 영역");

    expect(updatedPost.title).toBe("수정된 타이틀");
    expect(updatedPost.content).toBe("수정된 내용입니다.");
  });

  test("Post 삭제하기", async () => {
    let author = new User();
    author.id = "test@123";
    author.password = "";
    author.name = "tester";
    const userRepository = getConnection().getRepository(User);
    await userRepository.save(author);

    const createdPost = await createPost(
      "타이틀입니다.",
      "내용입니다.",
      author
    );

    expect(createdPost).not.toBeUndefined();
    expect(createdPost.id).not.toBeUndefined();

    await deletePost(createdPost.id);

    const post = await getPost(createdPost.id);
    expect(post).toBeUndefined();
  });
});
