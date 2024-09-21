// Ancestors
// Implement an ancestors method that returns the prototype chain (ancestors)
// of a calling object as an array of object names. Here's an example output:

// name property added to make objects easier to identify
const foo = {name: 'foo'};

let ancestorsMixIn = {
  ancestors() {
    let ancestorsArr = [];
    let lastAncestorObj = Object.getPrototypeOf(this);

    while (lastAncestorObj.hasOwnProperty('name')) {
      ancestorsArr.push(lastAncestorObj.name);
      lastAncestorObj = Object.getPrototypeOf(lastAncestorObj);
    }

    ancestorsArr.push('Object.prototype');
    console.log(ancestorsArr);
  }
};

Object.assign(foo, ancestorsMixIn);

const bar = Object.create(foo);
bar.name = 'bar';
const baz = Object.create(bar);
baz.name = 'baz';
const qux = Object.create(baz);
qux.name = 'qux';

qux.ancestors();  // returns ['baz', 'bar', 'foo', 'Object.prototype']
baz.ancestors();  // returns ['bar', 'foo', 'Object.prototype']
bar.ancestors();  // returns ['foo', 'Object.prototype']
foo.ancestors();  // returns ['Object.prototype']