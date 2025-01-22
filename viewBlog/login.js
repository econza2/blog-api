const loginButton = document.querySelector(".loginButton");
const usernameInput = document.querySelector(".usernameInput");
const passwordInput = document.querySelector(".passwordInput");
let accessMessage = "";

const verifyOptions = {
  method: "POST",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Token")}`,
  },
};

fetch("http://localhost:3000/verify-access", verifyOptions, {
  mode: "cors",
})
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    accessMessage = response.message;
    console.log(response);

    if (accessMessage === "Granted") {
      window.location.replace(
        "file:///home/coder/Desktop/folder/jwt-practice/viewBlog/loginSuccessful.html"
      );
    }
  })
  .catch((err) => {
    console.log(err);
  });

loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameInput.value,
      password: passwordInput.value,
    }),
  };

  fetch("http://localhost:3000/login", options, {
    mode: "cors",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      localStorage.setItem("Token", response.token);
      localStorage.setItem("userId", response.user_id);

      window.location.replace(
        "file:///home/coder/Desktop/folder/jwt-practice/viewBlog/loginSuccessful.html"
      );
    })

    .catch((err) => {
      console.log(err);
    });
});
