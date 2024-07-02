class Vehicle {
  constructor(color, weight) {
    this.color = color;
    this.weight = weight;
  }

  accelerate() {
    console.log(`Accelerating now...`);
  }

  decelerate() {
    console.log(`Decelerating now...`);
  }
}

class Car extends Vehicle {
  constructor(color, weight, licenseNumber) {
    super(color, weight);
    this.licenseNumber = licenseNumber;
  }

  honk() {
    console.log("Honk");
  }
}

class Boat extends Vehicle {
  constructor(color, weight, homePort) {
    super(color, weight);
    this.homePort = homePort;
  }

  dropAnchor() {
    console.log('Anchor dropping.');
  }
}

class Plane extends Vehicle {
  constructor(color, weight, airline) {
    super(color, weight);
    this.airline = airline;
  }

  takeOff() {
    console.log('Taking off!');
  }
}

let car = new Car('gray', 3000, '6MJ342');
let boat = new Boat('white', 200000, 'Southampton');
let southwest = new Plane('blue', 90000,' Southwest');

console.log(car);
console.log(boat);
console.log(southwest);
console.log(car.accelerate());
console.log(car.honk());
console.log(car.licenseNumber);
console.log(boat.decelerate());
console.log(boat.dropAnchor());
console.log(boat.weight);
console.log(southwest.takeOff());
console.log(southwest.color);

console.log(car instanceof Vehicle);
console.log(car instanceof Car);
console.log(boat instanceof Vehicle);
console.log(boat instanceof Car);