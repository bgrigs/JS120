// You have the following classes.

class Person {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "strolls";
  }
}

class Cat {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "saunters";
  }
}

class Cheetah {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "runs";
  }
}

const walkable = {
  walk() {
    return `${this.name} ${this.gait()} forward`;
  }
};

// You need to modify the code so that this works:

Object.assign(Person.prototype, walkable);
let mike = new Person("Mike");
console.log(mike.walk());
// "Mike strolls forward"

Object.assign(Cat.prototype, walkable);
let kitty = new Cat("Kitty");
console.log(kitty.walk());
// // "Kitty saunters forward"

Object.assign(Cheetah.prototype, walkable);
let flash = new Cheetah("Flash");
console.log(flash.walk());
// "Flash runs forward"
// You are only allowed to write one new method to do this