module.exports = {
  posts: [
    {
      id: "asdafasg",
      title: "teste mural",
      description: "Descrição teste",
    },
  ],
  //functions for the getm post and delete methods
  getAll() {
    return this.posts;
  },

  newPost(title, description) {
    this.posts.push({ id: generateID(), title, description });
  },

  deletePost(idToDelete) {
    this.posts = this.posts.filter((item) => {
      return item.id !== idToDelete;
    });
  },
};

function generateID() {
  return Math.random().toString(36).substring(2, 9);
}
