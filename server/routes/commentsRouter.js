const { Router } = require("express");
const {
  createComment,
  getPostComments,
  getUserComments,
  getSpecificComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentsController");

const verifyAccessBearer = require("./verifyAccessBearer");
const verifyAccessToken = require("./verifyAccessToken");

const commentsRouter = Router();

commentsRouter.post("/", verifyAccessBearer, verifyAccessToken, createComment);

commentsRouter.get(
  "/:post_id",
  verifyAccessBearer,
  verifyAccessToken,
  getPostComments
);
commentsRouter.get(
  "/user/:comment_user_id",
  verifyAccessBearer,
  verifyAccessToken,
  getUserComments
);
commentsRouter.get(
  "/comment/:comment_id",
  verifyAccessBearer,
  verifyAccessToken,
  getSpecificComment
);

commentsRouter.put(
  "/:comment_id",
  verifyAccessBearer,
  verifyAccessToken,
  updateComment
);

commentsRouter.delete(
  "/:comment_id",
  verifyAccessBearer,
  verifyAccessToken,
  deleteComment
);

module.exports = commentsRouter;
