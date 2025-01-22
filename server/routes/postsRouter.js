const { Router } = require("express");
const {
  createPost,
  getPosts,
  getUserPosts,
  getSpecificPost,
  updatePost,
  deletePost,
  publishPost,
} = require("../controllers/postsController");

const verifyAccessBearer = require("./verifyAccessBearer");
const verifyAccessToken = require("./verifyAccessToken");

const postsRouter = Router();

postsRouter.post("/", verifyAccessBearer, verifyAccessToken, createPost);

postsRouter.get("/", verifyAccessBearer, verifyAccessToken, getPosts);
postsRouter.get(
  "/:post_user_id",
  verifyAccessBearer,
  verifyAccessToken,
  getUserPosts
);
postsRouter.get(
  "/view-post/:post_id",
  verifyAccessBearer,
  verifyAccessToken,
  getSpecificPost
);

postsRouter.put("/:pots_id", verifyAccessBearer, verifyAccessToken, updatePost);
postsRouter.put(
  "/publish/:post_id",
  verifyAccessBearer,
  verifyAccessToken,
  publishPost
);

postsRouter.delete(
  "/:post_id",
  verifyAccessBearer,
  verifyAccessToken,
  deletePost
);

module.exports = postsRouter;
