function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,

    getDescription() {
      return `${this.title} was written by ${this.author}. I ${this.read ? 'have' : `haven't`} read it.`;
    },

    readBook() {
      this.read = true;
    }
  };
}

let mythos = createBook('Mythos', 'Stephen Fry');
let meTalkPretty = createBook('Me Talk Pretty One Day', 'David Sedaris');
let auntsArent = createBook(`Aunts aren't Gentlemen`, 'PG Wodehouse');

console.log(mythos.getDescription());
console.log(meTalkPretty.getDescription());
console.log(auntsArent.getDescription());

console.log(mythos.read);
console.log(meTalkPretty.read);
console.log(auntsArent.read);

console.log(mythos.readBook());

console.log(mythos.getDescription());
console.log(meTalkPretty.getDescription());
console.log(auntsArent.getDescription());