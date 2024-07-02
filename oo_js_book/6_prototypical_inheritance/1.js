// Using the constructor/prototype pattern,
// create a type that represents smartphones.
// Each smartphone should have a brand, model, and release year.
// Add methods that display the smartphone's info and check its battery level.
// Create objects that represent the following two smartphones:

function Smartphone(brand, model, releaseYear) {
  this.brand = brand;
  this.model = model;
  this.releaseYear = releaseYear;
}

Smartphone.prototype.checkBatteryLevel = function() {
  return `${this.brand} ${this.model} has 100% battery remaining.`;
};

Smartphone.prototype.displayInfo = function() {
  return `${this.model} by ${this.brand} was released in ${this.releaseYear}`;
};

let iphone12 = new Smartphone('Apple', 'iPhone 12', 2020);
let galaxyS21 = new Smartphone('Samsung', 'Galaxy S21', 2021);

console.log(iphone12.checkBatteryLevel());
console.log(iphone12.displayInfo());

console.log(galaxyS21.checkBatteryLevel());
console.log(galaxyS21.displayInfo());
