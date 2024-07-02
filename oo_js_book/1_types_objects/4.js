// Create objects that represent the following two smartphones:
// Add methods to check the battery level and to display the smartphones's info.

function Smartphones(brand, model, release) {
  this.brand = brand;
  this.model = model;
  this.release = release;

  this.checkBatteryLevel = function() {
    console.log(`The ${this.model} has a full battery`);
  };

  this.displayInformation = function() {
    console.log(`The ${this.model} was released by ${this.brand} in ${this.release}`);
  };
}

let iphone12 = new Smartphones('Apple', 'iPhone 12', 2020);
let galaxyS21 = new Smartphones('Samsung', 'Galaxy S21', 2021);

console.log(iphone12.checkBatteryLevel());
console.log(galaxyS21.displayInformation());