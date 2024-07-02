// let cats = {
//   names: [ 'Butterscotch', 'Pudding', 'Fluffy' ],
//   foo() {
//     [1, 2, 3].forEach(function(number) {
//       console.log(`${number}: ${this.names[number - 1]}`);
//     }, this);
//   },
// };

// cats.foo();
// Expected output:
// 1: Butterscotch
// 2: Pudding
// 3: Fluffy

// let logResult = function(func) {
//   let result = func();
//   console.log(result);
//   return result;
// };

// let foo = function() {
//   let sue = {
//     name: 'Sue Perkins',
//     age: 37,
//     myAge() {
//       return `${this.name} is ${this.age} years old.`;
//     },
//   };
//   logResult(sue.myAge.bind(sue));
// };

// foo();
// Expected output: Sue Perkins is 37 years old.

// let cat = {
//   name: 'Pudding',
//   colors: 'black and white',
//   identify() {
//     let report = () => {
//       console.log(`${this.name} is a ${this.colors} cat.`);
//     };
//     report();
//   },
// };

// cat.identify();

// Expected output: Pudding is a black and white cat.


// function bar() {
//   console.log('good morning');
// }

// global.inner = {
//   bar() {
//     console.log('good afternoon');
//   },
// };

// let obj = {
//   inner: {
//     bar() {
//       console.log('good night');
//     },

//     foo() {
//       bar();
//     },
//   },

//   bar() {
//     console.log('wake up');
//   },

//   foo() {
//     this.inner.bar(); // good afternoon
//     inner.bar(); // good afternoon
//     bar(); // good morning
//   }
// };

// let foo = function() {
//   console.log('go to sleep');
// }

// function go(foo) {
//   foo();
// }

// go(obj.foo);

