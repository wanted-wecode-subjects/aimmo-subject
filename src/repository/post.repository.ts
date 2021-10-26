import { getConnection } from "typeorm";
import { Post, PostList } from "../model/post";
import { User } from "../model/user";

export async function createPost(title: string, content: string, author: User) {
  const postRepository = getConnection().getRepository(Post);
  let post = new Post();
  post.title = title;
  post.content = content;
  post.author = author;
  return postRepository.save(post);
}

export async function getPost(id: string) {
  const postRepository = getConnection().getRepository(Post);
  return await postRepository.findOne({ id }, { relations: ["author"] });
}

export async function updatePost(
  id: string,
  title: string,
  content: string
): Promise<Post | undefined> {
  const postRepository = getConnection().getRepository(Post);
  const existPost = await postRepository.findOne({ id });
  // Tradeoff : findOne + save  vs update.
  // update는 존재 여부를 체크하기 어렵다.(할수는 있을듯?)
  // TODO: 개선하기
  if (existPost) {
    const result = await postRepository.save({ ...existPost, title, content });
    return result;
  } else {
    throw new Error(`존재하지않는 Post(${id})를 수정할 수 없습니다.`);
  }
}

export async function deletePost(id: string) {
  const postRepository = getConnection().getRepository(Post);
  const exitPost = await postRepository.findOne({ id });
  if (exitPost) {
    await postRepository.delete({ id });
  } else {
    throw new Error(`존재하지않는 Post(${id})를 삭제할 수 없습니다.`);
  }
}

export async function getPaginationPosts(
  offset: number,
  limit: number = 5
): Promise<PostList> {
  const postRepository = getConnection().getRepository(Post);

  const totalCount = await postRepository.count();

  let totalPage;
  if (totalCount % limit === 0) {
    totalPage = totalCount / limit;
  } else {
    totalPage = Math.floor(totalCount / limit) + 1;
  }

  let revisedOffset;
  if (offset >= totalPage) {
    revisedOffset = totalPage;
  } else if (offset < 1) {
    revisedOffset = 1;
  } else {
    revisedOffset = offset;
  }

  const posts = await postRepository.find({
    skip: limit * (revisedOffset - 1),
    take: limit,
    relations: ["author"],
  });

  return {
    posts,
    meta: {
      total: totalPage,
      limit,
      offset: revisedOffset,
    },
  };
}

export default {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getPaginationPosts,
};
