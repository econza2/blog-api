const database = require("../config/database");

async function createComment(req, res) {
  const timeNow = new Date();
  try {
    await database.query(
      "INSERT INTO comments (comment_content, comment_upload_time, comment_post_id, comment_user_id) VALUES ($1, $2, $3, $4)",
      [
        req.body.comment_content,
        timeNow,
        req.body.comment_post_id,
        req.body.comment_user_id,
      ]
    );
    res.json({ message: "Comment Created" });
  } catch (error) {
    res.json({ message: "Post or user does not exist" });
  }
}

async function getPostComments(req, res) {
  const { rows } = await database.query(
    "SELECT * FROM comments WHERE comment_post_id = $1",
    [req.params.post_id]
  );

  const commentData = rows[0];

  if (!commentData) {
    res.json({ message: "No Comments" });
  } else {
    res.json({ comments: rows });
  }
}

async function getUserComments(req, res) {
  const { rows } = await database.query(
    "SELECT * FROM comments WHERE comment_user_id = $1",
    [req.params.comment_user_id]
  );

  const commentData = rows[0];

  if (!commentData) {
    res.json({ message: "No Comments" });
  } else {
    res.json({ comments: rows });
  }
}

async function updateComment(req, res) {
  const { rows } = await database.query(
    "SELECT * FROM comments WHERE comment_id = $1",
    [req.body.comment_id]
  );

  const commentData = rows[0];

  const timeNow = new Date();

  if (!commentData) {
    res.json({ message: "Comment does not exist" });
  } else {
    await database.query(
      "UPDATE comments SET comment_content = $1, comment_upload_time = $2 WHERE comment_id= $3",
      [req.body.comment_content, timeNow, req.body.comment_id]
    );

    res.json({ message: "Comment Updated" });
  }
}

async function getSpecificComment(req, res) {
  const { rows } = await database.query(
    "SELECT * FROM comments WHERE comment_id = $1",
    [req.params.comment_id]
  );

  const commentData = rows[0];

  if (!commentData) {
    res.json({ message: "No Comment Found" });
  } else {
    res.json({ comment: rows });
  }
}

async function deleteComment(req, res) {
  const { rows } = await database.query(
    "SELECT * FROM comments WHERE comment_id = $1",
    [req.body.comment_id]
  );

  const commentData = rows[0];

  if (!commentData) {
    res.json({ message: "No Comment Found" });
  } else {
    await database.query("DELETE FROM comments WHERE comment_id = $1", [
      req.body.comment_id,
    ]);

    res.json({ message: "Comment Deleted" });
  }
}

module.exports = {
  createComment,
  getPostComments,
  getUserComments,
  updateComment,
  getSpecificComment,
  deleteComment,
};
