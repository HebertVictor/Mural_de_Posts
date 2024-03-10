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
        <div id="${post.id}" class="card mb-4">
  <div class="card-header">
    <div class="row">
      <h5 class="card-title col">${post.title}</h5>
      <button id="${post.id}A" onclick="editPost(event)" class="btn btn-outline-secondary col-auto">Edit</button>
    </div>
  </div>
  <div class="card-body">
  
  <div class="row">
    <div class="card-text">${post.description}</div>
  </div>

  </div>
  <button id="${post.id}B" onclick="deletePost(event)" class="btn btn-outline-danger">Delete</button>
</div>
`;

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

  if (title && description !== "") {
    fetch(url, {
      method: "post",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(post),
    }).then((res) => {
      updatePosts();

      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
    });
  } else {
    alert("The title and description cannot be empty");
  }
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

let clicked = false;

function editPost(event) {
  let elementId = event.target.id.slice(0, -1);

  if (clicked) {
    clicked = false;
  } else {
    clicked = true;
  }

  textArea(elementId, clicked);
}

function textArea(elementId, clicked) {
  let url = "http://localhost:3000/api/editPost";
  let titleTextArea = "";

  let title = "";

  if (clicked) {
    let h5Element = document.querySelector(`div#${elementId} h5.card-title`);
    let descElement = document.querySelector(`div#${elementId} div.card-text`);

    titleTextArea = document.createElement("textarea");
    descTextArea = document.createElement("textarea");

    titleTextArea.classList.add("titleTextArea");
    descTextArea.classList.add("descTextArea");

    titleTextArea.value = h5Element.innerText;
    descTextArea.value = descElement.innerText;

    h5Element.parentNode.replaceChild(titleTextArea, h5Element);
    descElement.parentNode.replaceChild(descTextArea, descElement);
  } else {
    titleTextArea = document.querySelector(
      `div#${elementId} textarea.titleTextArea`
    );
    title = titleTextArea.value;

    descTextArea = document.querySelector(
      `div#${elementId} textarea.descTextArea`
    );
    description = descTextArea.value;

    let post = { id: elementId, title: title, description: description };

    if (title && description !== "") {
      fetch(url, {
        method: "put",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(post),
      }).then((res) => {
        updatePosts();
      });
    } else {
      alert("The title and description cannot be empty");
      updatePosts();
    }
  }
}
