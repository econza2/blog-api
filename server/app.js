const express = require("express");
require("dotenv").config();
const path = require("node:path");
require("./config/passport");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const indexRouter = require("./routes/indexRouter");
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/commentsRouter");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use(indexRouter);

app.listen(3000, () => console.log("app listening on port 3000!"));
