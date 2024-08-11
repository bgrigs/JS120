const readline = require('readline-sync');
const shuffle = require('shuffle-array');

class Card {
  static SUITS = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  static RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10',
    'Jack', 'Queen', 'King', 'Ace'];
  static FACE_VALUE = 10;
  static ACE_VALUE = 11;
  static ACE_ADJUSTMENT = -10;

  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.hidden = false;
  }

  toString() {
    if (this.hidden) return 'Hidden Card';
    return `${this.rank} of ${this.suit}`;
  }

  hide() {
    this.hidden = true;
  }

  reveal() {
    this.hidden = false;
  }

  isFaceCard() {
    return (['Jack', 'Queen', 'King'].includes(this.rank));
  }

  isAce() {
    return this.rank === 'Ace';
  }
}

class Deck {
  constructor() {
    this.reset();
  }

  reset() {
    this.cards = [];
    Card.SUITS.forEach(suit => {
      Card.RANKS.forEach(rank => {
        this.cards.push(new Card(suit, rank));
      });
    });

    shuffle(this.cards);
  }

  deal(participant) {
    participant.hand = [this.cards.pop(), this.cards.pop()];
  }

  hit(participant) {
    participant.hand.push(this.cards.pop());
  }
}

class Participant {
  static TARGET_HAND_VALUE = 21;

  constructor(name) {
    this.reset();
    this.name = name;
  }

  reset() {
    this.hand = [];
    this.handValue = null;
    this.won = null;
  }

  updateHandValue() {
    this.handValue = 0;

    this.hand.forEach(card => this.addCardValue(card));

    this.hand.filter(card => card.isAce())
      .forEach(_ => {
        if (this.isBusted()) this.receiveAceAdjustment();
      });
  }

  addCardValue(card) {
    if (card.isFaceCard(card.rank)) {
      this.handValue += Card.FACE_VALUE;
    } else if (card.isAce(card.rank)) {
      this.handValue += Card.ACE_VALUE;
    } else {
      this.handValue += Number(card.rank);
    }
  }

  isBusted() {
    return this.handValue > Participant.TARGET_HAND_VALUE;
  }

  receiveAceAdjustment() {
    this.handValue += Card.ACE_ADJUSTMENT;
  }
}

class Player extends Participant {
  static MOVE_OPTIONS = ['h', 'hit', 's', 'stay'];
  static PLAY_AGAIN_OPTIONS = ['c', 'continue', 'q', 'quit'];
  static MONEY_TO_START = 5;
  static RICH = 10;
  static BROKE = 0;
  static AMOUNT_BET = 1;

  constructor() {
    super('Player');
    this.money = Player.MONEY_TO_START;
  }

  hasTargetHandValue() {
    return this.handValue === Participant.TARGET_HAND_VALUE;
  }

  hit(move) {
    return move === 'h' || move === 'hit';
  }

  getMoney() {
    this.money += Player.AMOUNT_BET;
  }

  loseMoney() {
    this.money -= Player.AMOUNT_BET;
  }

  isBroke() {
    return this.money === Player.BROKE;
  }

  isRich() {
    return this.money === Player.RICH;
  }

  quit(answer) {
    return answer === 'q' || answer === 'quit';
  }
}


class Dealer extends Participant {
  static HAND_VALUE_MIN = 17;

  constructor() {
    super('Dealer');
  }

  hasMinValue() {
    return this.handValue >= Dealer.HAND_VALUE_MIN;
  }
}

class TwentyOneGame {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
    this.participants = [this.player, this.dealer];
  }

  play() {
    this.displayWelcomeMessage();

    while (true) {
      if (this.checkExitGame()) break;

      this.dealCards();
      this.participants.forEach(participant => participant.updateHandValue());
      this.showCardsAndPlayerHandValue();
      this.playerTurn();

      if (!this.player.isBusted() && !this.player.won) this.dealerTurn();

      if (!this.dealer.isBusted() && !this.dealer.won
        && !this.player.won) this.compareHandValue();

      this.displayResult();

      if (this.player.isBroke() || this.player.isRich()) break;

      this.resetGame();
    }

    this.displayGoodByeMessage();
  }

  checkExitGame() {
    let answer = this.continueOrQuit();
    return this.player.quit(answer);
  }

  continueOrQuit() {
    console.log(`Enter 'c' to continue and 'q' to quit the game`);
    let answer = readline.prompt().toLowerCase();

    while (true) {
      if (Player.PLAY_AGAIN_OPTIONS.includes(answer)) {
        console.clear();
        break;
      } else {
        console.clear();
        console.log(`Invalid answer. Please enter 'c' to continue or 'q' to quit`);
        answer = readline.prompt().toLowerCase();
      }
    }

    return answer;
  }

  resetGame() {
    [this.participants, this.deck].flat().forEach(obj => obj.reset());
  }

  dealCards() {
    this.participants.forEach(participant => this.deck.deal(participant));
    this.dealer.hand[1].hide();
  }

  playerTurn() {
    while (true) {
      if (this.player.isBusted()) {
        this.dealerWinsRound();
        break;
      }

      if (this.player.hasTargetHandValue()) {
        this.playerWinsRound();
        break;
      }

      let move = this.hitOrStay();
      if (this.player.hit(move)) {
        this.deck.hit(this.player);
        this.player.updateHandValue();
      } else break;

      this.showCardsAndPlayerHandValue();
    }
  }

  dealerTurn() {
    while (true) {
      if (this.dealer.isBusted()) {
        this.playerWinsRound();
        break;
      }

      if (this.dealer.hasMinValue()) break;

      this.deck.hit(this.dealer);
      this.dealer.updateHandValue();
    }
  }

  playerWinsRound() {
    this.player.won = true;
    this.player.getMoney();
  }

  dealerWinsRound() {
    this.dealer.won = true;
    this.player.loseMoney();
  }

  showCardsAndPlayerHandValue() {
    this.showCards(this.player);
    this.showHandValue(this.player);
    this.displayLineBreak();
    this.showCards(this.dealer);
  }

  showCards(participant) {
    console.log(`${participant.name} cards:`);
    participant.hand.forEach(card => console.log(`** ${card}`));
  }

  showHandValue(participant) {
    console.log(`>> Hand value: ${participant.handValue}`);
  }

  hitOrStay() {
    this.displayLineBreak();
    console.log('Would you like to (h)it or (s)tay?');
    let answer = readline.prompt().toLowerCase();

    while (true) {
      if (Player.MOVE_OPTIONS.includes(answer)) {
        console.clear();
        break;
      } else {
        console.clear();
        this.showCardsAndPlayerHandValue();
        this.displayLineBreak();
        console.log(`Invalid answer. Please enter 'h' to hit or 's' to stay`);
        answer = readline.prompt().toLowerCase();
      }
    }

    return answer;
  }

  showAllCardsAndHandValues() {
    this.showCardsAndPlayerHandValue();
    this.dealer.hand[1].reveal();
    this.showHandValue(this.dealer);
  }

  compareHandValue() {
    if (this.player.handValue > this.dealer.handValue ||
      this.player.handValue === this.dealer.handValue) {
      this.playerWinsRound();
    } else {
      this.dealerWinsRound();
    }
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Twenty-One!');
    console.log(`You have $${Player.MONEY_TO_START} to start.`);
    console.log(`Each round you will win or lose $${Player.AMOUNT_BET}.`);
    console.log(`Play until you are broke or until you have $${Player.RICH}.`);
    this.displayLineBreak();
  }

  displayGoodByeMessage() {
    if (this.player.isBroke()) {
      console.log(`You don't have any money left. Time to call it quits.`);
    } else if (this.player.isRich()) {
      console.log(`You're rich! Time to cash out.`);
    }
    console.log(`Thank you for playing Twenty-One!`);
  }

  displayBusted() {
    let bustedParticipant;

    if (this.player.isBusted()) bustedParticipant = this.player.name;
    else if (this.dealer.isBusted()) bustedParticipant = this.dealer.name;

    if (bustedParticipant) console.log(`${bustedParticipant} has busted!`);
  }

  displayResult() {
    console.clear();
    this.showAllCardsAndHandValues();
    this.displayLineBreak();
    this.displayBusted();
    let winner = this.player.won ? this.player.name : this.dealer.name;
    console.log(`${winner} wins!`);
    console.log(`${this.player.name} balance: $${this.player.money}`);
    this.displayLineBreak();
  }

  displayLineBreak() {
    console.log('');
  }
}

let game = new TwentyOneGame();
game.play();

// add a method that changes the player/dealer state to won?
// move hit/stay and continue/quit options to Twenty One class 