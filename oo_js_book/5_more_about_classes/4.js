// Create a Rectangle class with private fields width and height
// Provide getters and setters for both fields
// Setters should raise a RangeError if the width/height isn't a positive number
// Add a getter for area to compute the area of the rectangle (width * height)

class Rectangle {
  #width;
  #height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.#width * this.#height;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  set width(newWidth) {
    if (newWidth < 0) {
      throw new RangeError('Width must be a positive number');
    } else {
      this.#width = newWidth;
    }
  }

  set height(newHeight) {
    if (newHeight < 0) {
      throw new RangeError('Height must be a positive number');
    } else {
      this.#height = newHeight;
    }
  }
}

let rect = new Rectangle(10, 5);
console.log(rect.area); // 50

rect.width = 20;
console.log(rect.area); // 100

rect.height = 12;
console.log(rect.area); // 240

try {
  rect.width = 0;
} catch (exception) {
  console.log(exception); // RangeError: width must be positive
}

try {
  rect.height = -10;
} catch (exception) {
  console.log(exception); // RangeError: height must be positive
}