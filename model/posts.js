module.exports = {
  posts: [
    {
      id: "asdafasg",
      title: "test ",
      description: "Description",
    },
    {
      id: "asasvas",
      title: "Batman The Dark Knight",
      description:
        "Batman is a legendary superhero known for his dark persona, exceptional detective skills, and vast array of gadgets. Born from tragedy, Batman, also known as Bruce Wayne, witnessed the murder of his parents as a child, which fueled his relentless pursuit of justice. Operating from Gotham City, he fights crime with intelligence, strength, and an unwavering commitment to his mission. With no superhuman powers, Batman relies on his physical prowess, intellect, and technology to combat villains and protect the innocent, earning him the title of the Dark Knight.",
    },
    {
      id: "anvavav",
      title: "The Epic Saga of Star Wars",
      description: `In a galaxy far, far away, the Star Wars saga unfolds across generations, captivating audiences with its timeless tale of good versus evil. From the humble beginnings of Luke Skywalker, a farm boy turned Jedi Knight, to the rise and fall of Darth Vader, once a heroic Jedi who succumbed to the dark side, the story is rich with iconic characters, thrilling battles, and deep moral themes.

      Set against the backdrop of a galaxy in turmoil, the Rebel Alliance battles the oppressive Galactic Empire, led by the sinister Emperor Palpatine and his enforcer, Darth Vader. The fate of the galaxy hangs in the balance as Luke Skywalker, Princess Leia, Han Solo, and their allies fight bravely against overwhelming odds.
      
      Filled with adventure, heroism, and the power of redemption, Star Wars has become a cultural phenomenon, inspiring generations of fans and leaving an indelible mark on popular culture.`,
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

  editPost(idToEdit, title, description) {
    this.posts.forEach((item) => {
      if (item.id === idToEdit) {
        item.title = title;
        item.description = description;
      }
    });
  },
};
function generateID() {
  return Math.random().toString(36).substring(2, 9);
}
