function foo() {
  console.log(this);
}

foo();

function qux() {
  this.bar = 'bar';
}

qux();

console.log(global.bar);