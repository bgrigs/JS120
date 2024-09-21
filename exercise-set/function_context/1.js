// What is This?
// Read the following code carefully.
// What do you think is logged on line 12.
// Try to answer the question before you run the code.

let person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);

// NaN. This is because when the keyword was used outside of a function.
// Thus, the this keyword is bound to the global object.
// When the keyword is used inside a function, the value will dpeend on
// how the function is invoked

// Thus, this.firstName and this.lastName are both undefined
// undefiend + undefined returns NaN