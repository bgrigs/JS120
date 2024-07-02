// Write a constructor function that creates objects that represent books.
// Each book should have a title, author, and the year published.
// Create objects that represent the following books:

function Book(title, author, yearPublished) {
  this.title = title;
  this.author = author;
  this.yearPublished = yearPublished;
}

let neuromancer = new Book('Nauromancer','William Gibson', 1984);
let doomsday = new Book('Doomsday Book','Connie Willis', 1992);

console.log(neuromancer);
console.log(doomsday);