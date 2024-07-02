// Create a BankAccount class with a private field balance.
// Add a private method, #checkBalance, that logs the current balance.
// Provide a public method, deposit, to add money to the account and
// withdraw to take money out.
// Raise a RangeError if there are insufficient funds for the withdrawal.

class BankAccount {
  #balance = 0;

  #checkBalance() {
    console.log(`Balance: ${this.#balance}`);
  }

  deposit(money) {
    this.#balance += money;
    this.#checkBalance();
  }

  withdraw(money) {
    if (this.#balance - money < 0) {
      throw new RangeError('Insufficient Funds');
    } else {
      this.#balance -= money;
      this.#checkBalance();
    }
  }
}

let account = new BankAccount();
account.deposit(100);
account.withdraw(50);
account.withdraw(100); // RangeError: Insufficient funds