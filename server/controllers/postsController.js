const database = require("../config/database");

async function createPost(req, res) {
  let timeNow = new Date();

  const { rows } = await database.query(
    "SELECT * FROM users WHERE user_id = $1",
    [req.body.post_user_id]
  );

  const userData = rows[0];

  if (!userData) {
    res.json({ message: "User does not exist" });
  } else {
    await database.query(
      "INSERT INTO posts (post_title, post_content, post_upload_time, post_published, post_user_id) VALUES ($1, $2, $3, $4, $5)",
      [
        req.body.post_title,
        req.body.post_content,
        timeNow,
        req.body.post_published,
        req.body.post_user_id,
      ]
    );

    res.json({
      message: "Post Created",
    });
  }
}

async function getPosts(req, res) {
  const { rows } = await database.query(
    "SELECT * FROM posts WHERE post_published = true"
  );

  res.json({ posts: rows });
}

async function getUserPosts(req, res) {
  const { rows } = await database.query(
    "SELECT * FROM posts WHERE post_user_id = $1",
    [req.params.post_user_id]
  );

  const postData = rows[0];

  if (!postData) {
    res.json({ message: "No posts by that user" });
  } else {
    res.json({ posts: rows });
  }
}

async function getSpecificPost(req, res) {
  if (!req.params.post_id) {
    res.json({ message: "You have not selected any posst" });
  } else {
    const { rows } = await database.query(
      "SELECT * FROM posts WHERE post_id = $1",
      [req.params.post_id]
    );

    const postData = rows[0];

    if (!postData) {
      res.json({ message: "Post does not exist" });
    } else {
      res.json({ post: rows });
    }
  }
}

async function updatePost(req, res) {
  const { rows } = await database.query(
    "SELECT * FROM posts WHERE post_id = $1",
    [req.body.post_id]
  );

  const postData = rows[0];

  if (!postData) {
    res.json({ message: "Post does not exist" });
  } else {
    await database.query(
      "UPDATE posts SET post_title = $1, post_content = $2 WHERE post_id = $3",
      [req.body.post_title, req.body.post_content, req.body.post_id]
    );

    res.json("Post Updated");
  }
}

async function deletePost(req, res) {
  const { rows } = await database.query(
    "SELECT * FROM posts WHERE post_id = $1",
    [req.body.post_id]
  );

  const postData = rows[0];

  if (!postData) {
    res.json({ message: "Post does not exist" });
  } else {
    await database.query("DELETE FROM comments WHERE comment_post_id = $1", [
      req.body.post_id,
    ]);

    await database.query("DELETE FROM posts WHERE post_id = $1 ", [
      req.body.post_id,
    ]);

    res.json("Post Deleted");
  }
}

async function publishPost(req, res) {
  const { rows } = await database.query(
    "SELECT * FROM posts WHERE post_id = $1",
    [req.body.post_id]
  );

  const postData = rows[0];

  if (!postData) {
    res.json({ message: "No such post exists" });
  } else {
    if (postData.post_published === true) {
      await database.query(
        "UPDATE posts SET post_published = $1 WHERE post_id = $2",
        [false, req.body.post_id]
      );

      res.json({ message: "Post Unpublished " });
    } else {
      await database.query(
        "UPDATE posts SET post_published = $1 WHERE post_id = $2",
        [true, req.body.post_id]
      );

      res.json({ message: "Post Published " });
    }
  }
}

module.exports = {
  createPost,
  getPosts,
  getUserPosts,
  getSpecificPost,
  updatePost,
  deletePost,
  publishPost,
};
