// Write a simple constructor function that creates objects that
// represent musical albums.
// Each album should have a title, artist, and release year.
// Create objects that represent the following 2 albums:

function Album(title, artist, release) {
  this.title = title;
  this.artist = artist;
  this.release = release;
}

let thriller = new Album('Thriller', 'Michael Jackson', 1982);
let darkSide = new Album('The Dark Side of the Moon', 'Pink Floyd', 1973);

console.log(thriller);
console.log(darkSide);
