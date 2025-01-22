const blogList = document.querySelector(".blogList");

const postOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Token")}`,
  },
};

fetch("http:localhost:3000/posts", postOptions, { mode: "cors" })
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    let blogListItems = response;

    blogListItems.posts.forEach((item) => {
      const itemOnList = document.createElement("li");
      const anchorOnItem = document.createElement("a");
      anchorOnItem.textContent = item.post_title;
      anchorOnItem.href = `./pageContent.html?postIndex=${item.post_id}`;
      itemOnList.appendChild(anchorOnItem);
      blogList.appendChild(itemOnList);
    });
  });
