const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const indexRouter = Router();

const verifyAccessBearer = require("./verifyAccessBearer");
const verifyAccessToken = require("./verifyAccessToken");

indexRouter.post("/login", passport.authenticate("local"), (req, res) => {
  jwt.sign({ user: req.user }, process.env.JWT_SIGN_SECRET, (err, token) => {
    res.json({
      token,
      user_id: req.user.user_id,
    });
  });
});

indexRouter.post(
  "/verify-access",
  verifyAccessBearer,
  verifyAccessToken,
  (req, res) => {
    res.json({ message: "Granted" });
  }
);

module.exports = indexRouter;
