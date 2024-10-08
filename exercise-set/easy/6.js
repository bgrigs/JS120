// Refactoring Vehicles
// Refactor these classes so they all use a common superclass,
// and inherit behavior as needed.

class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  info() {
    return `${this.make} ${this.model}`;
  }
}

class Car extends Vehicle {
  getWheels() {
    return 4;
  }
}

class Motorcycle extends Vehicle {
  getWheels() {
    return 2;
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model);
    this.payload = payload;
  }

  getWheels() {
    return 6;
  }
}

let car = new Car('Nissan', 'Versa');
let motorcycle = new Motorcycle('Harley', 'Big');
let truck = new Truck('Toyota', 'Tundra', '1000');

console.log(car.getWheels());
console.log(car.make);
console.log(motorcycle.getWheels());
console.log(motorcycle.model);
console.log(truck.getWheels());
console.log(truck.payload);