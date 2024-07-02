// Given the following three objects,
// create an object factory that can eliminate the code duplication:

function createFruit(name, color) {
  return {
    name,
    color,

    isRipe: function() {
      return `This ${this.name} is ripe.`;
    },

    describe: function() {
      return `This ${this.name} is ${this.color}.`;
    }
  };
}

let apple = createFruit('apple', 'red');
let banana = createFruit('banana', 'yellow');
let blackberry = createFruit('blackberry', 'black');

console.log(apple.isRipe());
console.log(banana.describe());
console.log(blackberry);