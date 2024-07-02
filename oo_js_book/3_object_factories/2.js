function createSmartPhone(brand, model, release) {
  return {
    brand,
    model,
    release,

    checkBatteryLevel() {
      console.log(`The ${this.model} has a full battery`);
    },

    displayInformation() {
      console.log(`The ${this.model} was released by ${this.brand} in ${this.release}`);
    },
  };
}

let iphone12 = createSmartPhone('Apple', 'iPhone 12', 2020);
let galaxyS21 = createSmartPhone('Samsung', 'Galaxy S21', 2021);

console.log(iphone12);
console.log(galaxyS21);
console.log(iphone12.checkBatteryLevel());
console.log(galaxyS21.displayInformation());