// Hello, Sophie! (part 1)

class Cat {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`My name is ${this.name}`);
  }

}

let kitty = new Cat('Sophie');
kitty.greet();
// Expected output:

// Copy Code
// Hello! My name is Sophie!