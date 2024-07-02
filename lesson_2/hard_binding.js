// 1. What method can we use to bind a function
// permanently to a particular execution context?

// 2. What will the following code log to the console?

// let obj = {
//   message: 'JavaScript',
// };

// function foo() {
//   console.log(this.message);
// }

// foo.bind(obj);

// 3. What will the following code output?

// let obj = {
//   a: 2,
//   b: 3,
// };

// function foo() {
//   return this.a + this.b;
// }

// let bar = foo.bind(obj);

// console.log(foo());
// console.log(bar());

// 4. What will the code below log to the console?

// let positivity = {
//   message: 'JavaScript makes sense!',
// };

// let negativity = {
//   message: 'JavaScript makes no sense!',
// };

// function foo() {
//   console.log(this.message);
// }

// let bar = foo.bind(positivity);

// negativity.logMessage = bar;
// negativity.logMessage();

// 5. What will the code below output?

// let obj = {
//   a: 'Amazebulous!',
// };
// let otherObj = {
//   a: "That's not a real word!",
// };

// function foo() {
//   console.log(this.a);
// }

// let bar = foo.bind(obj);

// bar.call(otherObj);

