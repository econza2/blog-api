const { Router } = require("express");
const {
  getUserSpecific,
  getUsers,
  deleteUser,
  updateUser,
  createUser,
} = require("../controllers/usersController");

const verifyAccessBearer = require("./verifyAccessBearer");
const verifyAccessToken = require("./verifyAccessToken");

const usersRouter = Router();

usersRouter.get("/", verifyAccessBearer, verifyAccessToken, getUsers);
usersRouter.get(
  "/:user_id",
  verifyAccessBearer,
  verifyAccessToken,
  getUserSpecific
);

usersRouter.delete(
  "/:user_id",
  verifyAccessBearer,
  verifyAccessToken,
  deleteUser
);

usersRouter.put("/:user_id", verifyAccessBearer, verifyAccessToken, updateUser);

usersRouter.post("/", createUser);

module.exports = usersRouter;
