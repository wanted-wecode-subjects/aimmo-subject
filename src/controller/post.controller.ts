import express, { json } from "express";
import { Post } from "../model/post";
import { User } from "../model/user";
import postRepository from "../repository/post.repository";
import {
  NO_EXIST_POST_CODE,
  PARAMENTER_ERROR_CODE,
  UNAUTHORIZED_POST_CODE,
} from "../util/errorCode";

export async function getPaginationPosts(
  req: express.Request,
  res: express.Response
) {
  const { limit, offset } = req.body;
  const pageCount = Number(limit);
  const page = Number(offset);

  if (isNaN(page) || isNaN(pageCount)) {
    return res.json({
      success: false,
      error: "pagination parameter is invalid.",
      errorCode: PARAMENTER_ERROR_CODE,
    });
  }

  const data = await postRepository.getPaginationPosts(page, pageCount);

  res.json({
    data,
    success: true,
  });
}

export async function getPost(req: express.Request, res: express.Response) {
  const { id } = req.body;

  if (!validatePostId(id)) {
    return res.json({
      success: false,
      error: "parameter is invalid.",
      errorCode: PARAMENTER_ERROR_CODE,
    });
  }

  const data = await postRepository.getPost(id);
  return res.json({
    data,
    succuess: true,
  });
}

export async function createPost(req: express.Request, res: express.Response) {
  const user = req.user!;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.json({
      success: false,
      error: "Parameters for creating post is invalid.",
      errorCode: PARAMENTER_ERROR_CODE,
    });
  }

  const data = await postRepository.createPost(title, content, user);
  res.json({
    data,
    success: true,
  });
}

export async function updatePost(req: express.Request, res: express.Response) {
  const user = req.user!;
  const { id } = req.params;
  const { title, content } = req.body;

  if (!validatePostId(id)) {
    return res.json({
      success: false,
      error: "parameter is invalid.",
      errorCode: PARAMENTER_ERROR_CODE,
    });
  }

  const post = await postRepository.getPost(id);

  if (!post) {
    return res.json({
      success: false,
      error: "존재하지않는 게시글입니다.",
      errorCode: NO_EXIST_POST_CODE,
    });
  }

  if (!validatePostAuthor(post, user)) {
    return res.json({
      success: false,
      error: "게시글을 수정할 권한이 없습니다.",
      errorCode: UNAUTHORIZED_POST_CODE,
    });
  }

  const data = await postRepository.updatePost(id, title, content);
  res.json({
    succes: true,
    data,
  });
}

export async function deletePost(req: express.Request, res: express.Response) {
  const user = req.user!;
  const { id } = req.params;

  // update 와 중복되는 검증코드
  if (!validatePostId(id)) {
    return res.json({
      success: false,
      error: "parameter is invalid.",
      errorCode: PARAMENTER_ERROR_CODE,
    });
  }

  const post = await postRepository.getPost(id);

  if (!post) {
    return res.json({
      success: false,
      error: "존재하지않는 게시글입니다.",
      errorCode: NO_EXIST_POST_CODE,
    });
  }

  if (!validatePostAuthor(post, user)) {
    return res.json({
      success: false,
      error: "게시글을 삭제할 권한이 없습니다.",
      errorCode: UNAUTHORIZED_POST_CODE,
    });
  }
  await postRepository.deletePost(id);
  res.json({
    succes: true,
  });
}

export default {
  getPaginationPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};

function validatePostId(id: unknown) {
  return typeof id === "string" && id !== "";
}

function validatePostAuthor(post: Post, user: User) {
  return post.author.id !== user.id;
}
