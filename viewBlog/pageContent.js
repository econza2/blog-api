const blogTitle = document.querySelectorAll(".blogTitle");
const blogContent = document.querySelector(".blogContent");
const blogUploadTime = document.querySelector(".blogUploadTime");

const urlParams = new URLSearchParams(window.location.search);
const postIndex = urlParams.get("postIndex");

const postOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Token")}`,
  },
};

fetch(`http://localhost:3000/posts/view-post/${postIndex}`, postOptions, {
  mode: "cors",
})
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    blogTitle.forEach((item) => {
      item.textContent = response["post"][0]["post_title"];
    });
    blogContent.textContent = response["post"][0]["post_content"];
    blogUploadTime.textContent = response["post"][0]["post_upload_time"];
  });

//Dealing with Comments (Creation)
const commentButton = document.querySelector(".commentButton");
const commentContent = document.querySelector(".commentContent");

commentButton.addEventListener("click", (e) => {
  e.preventDefault();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    body: JSON.stringify({
      comment_content: commentContent.value,
      comment_post_id: postIndex,
      comment_user_id: localStorage.getItem("userId"),
    }),
  };

  fetch("http://localhost:3000/comments", options, { mode: "cors" })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      commentContent.value = "";
      location.reload();
    });
});

//Dealing With Comments (Display)
const commentList = document.querySelector(".commentList");

const commentOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Token")}`,
  },
};

fetch(`http://localhost:3000/comments/${postIndex}`, commentOptions, {
  mode: "cors",
})
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    response["comments"].forEach((comment) => {
      const commentListItem = document.createElement("li");
      commentListItem.textContent = `${comment.comment_content} ${comment.comment_upload_time}`;
      commentList.appendChild(commentListItem);
    });
  });
