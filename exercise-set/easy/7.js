// What Will This Do?
// What will the following code log?

class Something {
  constructor() {
    this.data = "Hello";
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return "ByeBye";
  }
}

let thing = new Something();
console.log(Something.dupData());
console.log(thing.dupData());

// Line 16 will log ByeBye to the console. This is because we are calling
// the static method `dupData` which is defined on the `Something` class
// Line 17 will log HelloHello to the console. We are now calling
// the instance method `dupData` which is defined on the instance, in this case
// the object `thing`.