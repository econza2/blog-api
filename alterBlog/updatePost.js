const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");

const postOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("TokenAlter")}`,
  },
};

fetch(`http://localhost:3000/posts/view-post/${postId}`, postOptions, {
  mode: "cors",
})
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    const postTitle = document.querySelector(".postTitle");
    const postContent = document.querySelector(".postContent");

    postTitle.value = response["post"][0]["post_title"];
    postContent.value = response["post"][0]["post_content"];
  });

//Updating the Post

const updatePostButton = document.querySelector(".updatePostButton");
const postTitleOutside = document.querySelector(".postTitle");
const postContentOutside = document.querySelector(".postContent");

updatePostButton.addEventListener("click", (e) => {
  e.preventDefault();

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("TokenAlter")}`,
    },
    body: JSON.stringify({
      post_title: postTitleOutside.value,
      post_content: postContentOutside.value,
      post_id: postId,
    }),
  };

  fetch(`http://localhost:3000/posts/${postId}`, options, { mode: "cors" })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      window.location.replace(
        "file:///home/coder/Desktop/folder/jwt-practice/alterBlog/loginSuccessful.html"
      );
    });
});
