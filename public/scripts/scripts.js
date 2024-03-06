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
        
        <!-- <button type="button" class="btn btn-danger">Delete</button>
     --> 
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

  options = fetch(url, {
    method: "post",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(post),
  }).then((res) => {
    console.log(res);
    updatePosts();

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
  });
}