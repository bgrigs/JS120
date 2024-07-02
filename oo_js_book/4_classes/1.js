class Smartphone {
  constructor(brand, model, release) {
    this.brand = brand;
    this.model = model;
    this.release = release;
  }

  displayInfo() {
    console.log(`The ${this.brand} ${this.model} was released in ${this.release}.`);
  }

  displayBattery() {
    console.log(`The ${this.brand} ${this.model} has 100% battery remaining.`);
  }
}

let iphone12 = new Smartphone('Apple', 'iPhone 12', '2020');
let galaxyS21 = new Smartphone('Samsung', 'Galaxy S21', '2021');

console.log(iphone12.displayInfo());
console.log(galaxyS21.displayBattery());
console.log(iphone12 instanceof Smartphone);
console.log(galaxyS21);