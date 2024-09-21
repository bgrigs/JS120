// Consider the following code:
class Pet {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }

  info() {
    return `a ${this.type} named ${this.name}`;
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  numberOfPets() {
    return this.pets.length;
  }
}

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

class Shelter {
  constructor() {
    this.owners = [];
  }

  adopt(owner, pet) {
    if (!this.owners.includes(owner)) this.owners.push(owner);
    owner.pets.push(pet);
  }

  printAdoptions() {
    this.owners.forEach(owner => {
      console.log(`${owner.name} has adopted the following pets`);
      owner.pets.forEach(pet => {
        console.log(pet.info());
      });
      console.log('');
    });
  }
}

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);

// Write the classes and methods that will be necessary to make this code run,
// and log the following output:

// P Hanson has adopted the following pets:
// a cat named Butterscotch
// a cat named Pudding
// a bearded dragon named Darwin

// B Holmes has adopted the following pets:
// a dog named Molly
// a parakeet named Sweetie Pie
// a dog named Kennedy
// a fish named Chester

// P Hanson has 3 adopted pets.
// B Holmes has 4 adopted pets.
// The order of the output does not matter,
// so long as all of the information is presented.