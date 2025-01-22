const urlParams = new URLSearchParams(window.location.search);
const commentId = urlParams.get("commentId");

const commentOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("TokenAlter")}`,
  },
};

fetch(`http://localhost:3000/comments/comment/${commentId}`, commentOptions, {
  mode: "cors",
})
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    const commentContent = document.querySelector(".commentContent");
    commentContent.value = response["comment"][0].comment_content;
  });

const updateCommentButton = document.querySelector(".updateCommentButton");
const commentContentOutside = document.querySelector(".commentContent");

updateCommentButton.addEventListener("click", (e) => {
  e.preventDefault();

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("TokenAlter")}`,
    },
    body: JSON.stringify({
      comment_id: commentId,
      comment_content: commentContentOutside.value,
    }),
  };

  fetch(`http://localhost:3000/comments/${commentId}`, options, {
    mode: "cors",
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      window.location.replace(
        "file:///home/coder/Desktop/folder/jwt-practice/alterBlog/loginSuccessful.html"
      );
    });
});
