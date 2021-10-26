import express from "express";
import postController from "../controller/post.controller";
import userController from "../controller/user.controller";
import { auth } from "../middlewares/auth.middle.ware";

const router = express.Router();

// post
router.get("/post/", postController.getPaginationPosts);
router.get("/post/:id", postController.getPost);
router.post("/post", auth, postController.createPost);
router.delete("/post/:id", auth, postController.deletePost);
router.put("/post/:id", auth, postController.updatePost);

// user
router.post("/user", userController.createUser);
router.post("/user/auth", userController.authenticate);
router.get("/user/me", userController.getCurrentUser);

export default router;
