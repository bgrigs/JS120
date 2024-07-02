class Person {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#setAge(age);
  }

  #setAge(age) {
    if (age > 0 && typeof age === 'number') {
      this.#age = age;
    } else {
      throw new RangeError('Age must be a number greater than 0.');
    }
  }

  showAge() {
    console.log(this.#age);
  }
}

let person = new Person('Bob', 30);
person.showAge(); // 30

let person2 = new Person('Rob', -5);
person2.showAge();