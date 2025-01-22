const database = require("../config/database");
const bcrypt = require("bcryptjs");

async function getUsers(req, res) {
  const { rows } = await database.query("SELECT * FROM users");

  res.json(rows);
}

async function getUserSpecific(req, res) {
  const { rows } = await database.query(
    "SELECT * FROM users WHERE user_id = $1",
    [req.params.user_id]
  );

  res.json(rows);
}

async function deleteUser(req, res) {
  const { rows } = await database.query(
    "SELECT * FROM users WHERE user_id = $1",
    [req.params.user_id]
  );

  const userData = rows[0];

  if (!userData) {
    res.json({
      status: "User does not exist",
    });
  } else {
    await database.query("DELETE FROM users WHERE user_id = $1", [
      req.params.user_id,
    ]);

    res.json({
      status: "User Deleted",
    });
  }
}

async function updateUser(req, res) {
  const { rows } = await database.query(
    "SELECT * FROM users WHERE user_id = $1",
    [req.params.user_id]
  );

  const userData = rows[0];

  if (!userData) {
    res.json({ status: "User Does not Exist" });
  } else {
    await database.query("UPDATE users SET username = $1 WHERE user_id = $2", [
      req.body.username,
      req.params.user_id,
    ]);

    res.json({
      status: "Username updated",
    });
  }
}

async function createUser(req, res, next) {
  const { rows } = await database.query(
    "SELECT * FROM users WHERE username = $1",
    [req.body.username]
  );

  const userData = rows[0];
  console.log(userData);

  if (!userData) {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log("Error hashing password");
      } else {
        try {
          await database.query(
            "INSERT INTO users (username, password) VALUES ($1, $2)",
            [req.body.username, hashedPassword]
          );
          res.json({
            status: "User created",
          });
        } catch (err) {
          next(err);
        }
      }
    });
  } else {
    res.json({
      status: "User with same username already exists",
    });
  }
}

module.exports = {
  getUsers,
  getUserSpecific,
  deleteUser,
  updateUser,
  createUser,
};
