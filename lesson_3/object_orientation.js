function createProduct(id, itemName, stock, price) {
  return {
    id,
    itemName,
    stock,
    price,
    changePrice(newPrice) {
      if (newPrice >= 0) {
        this.price = newPrice;
      } else console.log('Invalid Price');
    },
    describe() {
      console.log(`=> Name: ${this.name}
    => ID: ${this.id}
    => Price: $${this.price}
    => Stock: ${this.stock}`);
    },
  };
}

let scissor = createProduct(0, 'Scissors', 8, 10);
let drill = createProduct(1, 'Cordless Drill', 15, 45);
let hammer = createProduct(2, `Thor's Hammer`, 1, 500000);
let ladder = createProduct(3, `Stairway to Roof`, 20, 30);


console.log(scissor);
console.log(drill);
console.log(hammer);
console.log(ladder);

// console.log(drill);