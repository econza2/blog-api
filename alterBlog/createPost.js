const createPostButton = document.querySelector(".createPostButton");
const postTitle = document.querySelector(".postTitle");
const postContent = document.querySelector(".postContent");
const postPublished = document.querySelector(".postPublished");

createPostButton.addEventListener("click", (e) => {
  e.preventDefault();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("TokenAlter")}`,
    },
    body: JSON.stringify({
      post_title: postTitle.value,
      post_content: postContent.value,
      post_published: postPublished.value,
      post_user_id: localStorage.getItem("userIdAlter"),
    }),
  };

  fetch("http://localhost:3000/posts", options, {
    mode: "cors",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);

      window.location.replace(
        "file:///home/coder/Desktop/folder/jwt-practice/alterBlog/loginSuccessful.html"
      );
    })

    .catch((err) => {
      console.log(err);
    });
});
