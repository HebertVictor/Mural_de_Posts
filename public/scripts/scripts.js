document.addEventListener("DOMContentLoaded", () => {
  updatePosts(); // when page finishes loading it gets all of the posts
});

function updatePosts() {
  const url = "http://localhost:3000/api/all";

  fetch(url) //fetch the url to get our array of objects
    .then((res) => {
      return res.json(); //stringfied
    })
    .then((json) => {
      let postElements = "";

      let posts = JSON.parse(json);

      posts.forEach((post) => {
        // for each post in the array make this html structure
        let postElement = `
        <div id=${post.id} class="card mb-4">
        <div class="card-header">
            <h5 class="card-title">${post.title}</h5>
        </div>
        <div class="card-body">
            <div class="card-text">${post.description}</div>
        </div> 
        <button id=${
          post.id + "B"
        } onclick="deletePost(event)" type="button" class="btn btn-outline-danger">Delete</button>
    </div>`;

        postElements += postElement; // put all of it together
      });

      document.getElementById("posts").innerHTML = postElements; // insert in the page
    });
}

function newPost() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  //getting the data from the input sections

  let post = { title, description };

  const url = "http://localhost:3000/api/new";

  fetch(url, {
    method: "post",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(post),
  }).then((res) => {
    updatePosts();

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
  });
}

function deletePost(event) {
  const url = "http://localhost:3000/api/deletePost";

  let elementId = event.target.id;
  let idToDelete = elementId.slice(0, -1);

  let post = { id: idToDelete };

  let erase = prompt(
    "Are you sure you want to delete the post? Type Yes or No"
  );

  if (erase.toUpperCase() === "YES") {
    fetch(url, {
      method: "delete",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(post),
    }).then((res) => {
      updatePosts();
    });
  }
}
