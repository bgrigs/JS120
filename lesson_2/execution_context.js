// 1. What will the following code output?
// Try to determine the results without running the code.

// function func() {
//   return this;
// }

// let context = func();

// console.log(context);


// 2. What will the following code output?
// Explain the difference, if any, between this output and that of problem 1.

// let obj = {
//   func: function() {
//     return this;
//   },
// };

// let context = obj.func();

// console.log(context);

// 3. What will the following code output?

// message = 'Hello from the global scope!';

// function deliverMessage() {
//   console.log(this.message);
// }

// deliverMessage();

// let foo = {
//   message: 'Hello from the function scope!',
// };

// foo.deliverMessage = deliverMessage;

// foo.deliverMessage();

// 4. What built-in methods have we learned about that we can use to specify
// a function's execution context explicitly?

// 5. Take a look at the following code snippet.
// Use call to invoke the add method but with foo as execution context.
// What will this return?

let foo = {
  a: 1,
  b: 2,
};

let bar = {
  a: 'abc',
  b: 'def',
  add: function() {
    return this.a + this.b;
  },
};

bar.add.call(foo);


