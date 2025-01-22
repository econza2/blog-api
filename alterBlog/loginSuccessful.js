//User Posts
const userPosts = document.querySelector(".userPosts");

const userId = localStorage.getItem("userIdAlter");

const postOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("TokenAlter")}`,
  },
};

fetch(`http://localhost:3000/posts/${userId}`, postOptions, { mode: "cors" })
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    response["posts"].forEach((post) => {
      const postList = document.createElement("li");
      const postTitle = document.createElement("span");
      postTitle.textContent = post.post_title;
      const postPublished = document.createElement("span");
      postPublished.textContent = post.post_published;
      const publishButton = document.createElement("button");
      publishButton.textContent = "Publish/Unpublish";
      const postUpdateButton = document.createElement("a");
      postUpdateButton.textContent = "Update";
      postUpdateButton.href = `file:///home/coder/Desktop/folder/jwt-practice/alterBlog/updatePost.html?postId=${post.post_id}`;
      const postDeleteButton = document.createElement("button");
      postDeleteButton.textContent = "Delete";
      postList.appendChild(postTitle);
      postList.appendChild(postPublished);
      postList.appendChild(publishButton);
      postList.appendChild(postUpdateButton);
      postList.appendChild(postDeleteButton);
      userPosts.appendChild(postList);

      publishButton.addEventListener("click", (e) => {
        e.preventDefault();

        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("TokenAlter")}`,
          },
          body: JSON.stringify({
            post_id: post.post_id,
          }),
        };

        fetch(`http://localhost:3000/posts/publish/${post.post_id}`, options, {
          mode: "cors",
        })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            location.reload();
          });
      });

      postDeleteButton.addEventListener("click", (e) => {
        e.preventDefault();

        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("TokenAlter")}`,
          },
          body: JSON.stringify({
            post_id: post.post_id,
          }),
        };

        fetch(`http://localhost:3000/posts/${post.post_id}`, options, {
          mode: "cors",
        })
          .then((response) => {
            response.json();
          })
          .then((response) => {
            location.reload();
          });
      });
    });
  });

//User Comments
const userComments = document.querySelector(".userComments");

const commentOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("TokenAlter")}`,
  },
};

fetch(`http:localhost:3000/comments/user/${userId}`, commentOptions, {
  mode: "cors",
})
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    response["comments"].forEach((comment) => {
      const commentList = document.createElement("li");
      const commentContent = document.createElement("span");
      commentContent.textContent = comment.comment_content;
      const commentUploadTime = document.createElement("span");
      commentUploadTime.textContent = comment.comment_upload_time;
      const commentUpdate = document.createElement("a");
      commentUpdate.textContent = "Update";
      commentUpdate.href = `file:///home/coder/Desktop/folder/jwt-practice/alterBlog/updateComment.html?commentId=${comment.comment_id}`;
      const commentDelete = document.createElement("button");
      commentDelete.textContent = "Delete";
      commentList.appendChild(commentContent);
      commentList.appendChild(commentUploadTime);
      commentList.appendChild(commentUpdate);
      commentList.appendChild(commentDelete);
      userComments.appendChild(commentList);

      commentDelete.addEventListener("click", (e) => {
        e.preventDefault();

        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("TokenAlter")}`,
          },
          body: JSON.stringify({
            comment_id: comment.comment_id,
          }),
        };

        fetch(`http://localhost:3000/comments/${comment.comment_id}`, options, {
          mode: "cors",
        })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            location.reload();
          });
      });
    });
  });
