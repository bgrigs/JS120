/*
Nouns: game, dealer, participant, player, points, game, deck, 4 suits, 13 ranks,
  turn,
Verbs: start, deal, receive, hide, see, takes turn, hit, stay, busts,
  (delear) reveals, determine results

Game states: win, lose, tie. bust, however, can be a state for each participant

Game (n)
  -start (v)
  - determine results (v)
  - win (v)
  - lose (v)

Card (n)
  - suits (n)
  - rank (n)

Deck (n)
  - deal (should it be here or in Dealer?)

Participant (n)
  - hit (v)
  - stay (v)
  - takes turn (v)
  - busts (v, state)
  - points (n)

  - player (n)

  - dealer(n)
    - deals(v) should this be here or in the deck?
    - hide(v)
    - reveals(v)

- Welcome the Player

- Each time the player has a chance to hit or stay
  - display dealer's hand (one card is hidden)
  - display player's hand + point total

- Dealer's turn (occurs after player stays)
  - dealer doesn't play if the player busts
  - display the dealer's hand, including the hidden card, + report point total.
  - redisplay the dealer's hand and point total and each time he hits.
  - display the results when the dealer stays.

- After a game is over, ask the player if they want to play again

- When the program starts, give the player 5 dollars with which to bet.
  - Deduct 1 dollar each time she loses, and add 1 dollar each time she wins.
  - The program should quit when
    - she is broke (0 dollars) or
    - rich (has a total of 10 dollars).

- Be prepared to run out of cards.
  - You can either create a new deck for each game,
  - or keep track of how many cards remain and create a new deck as needed.
*/


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

  constructor() {
    this.reset();
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
        if (this.isBusted()) this.makeAceAdjustment();
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

  makeAceAdjustment() {
    this.handValue += Card.ACE_ADJUSTMENT;
  }
}

class Player extends Participant {
  static MOVE_OPTIONS = ['h', 'hit', 's', 'stay'];
  static MONEY_TO_START = 5;
  static RICH = 10;
  static BROKE = 0;
  static AMOUNT_BET = 1;

  constructor() {
    super();
    this.money = Player.MONEY_TO_START;
  }

  hasTargetHandValue() {
    return this.handValue === Participant.TARGET_HAND_VALUE;
  }

  hit(move) {
    return move === 'h' || move === 'hit';
  }

  score() {
    // STUB
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
}


class Dealer extends Participant {
  static HAND_VALUE_MIN = 17;

  constructor() {
    super();
    // STUB
    // What sort of state does a dealer need?
    // Score? Hand? Deck of cards?
  }

  hasMinValue() {
    return this.handValue >= Dealer.HAND_VALUE_MIN;
  }

  score() {
    //STUB
  }
}

class TwentyOneGame {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }

  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.dealCards();
      this.player.updateHandValue();
      this.dealer.updateHandValue();
      this.showCards();
      this.playerTurn();

      if (!this.player.isBusted() && !this.player.won) this.dealerTurn();

      if (!this.dealer.isBusted() && !this.dealer.won) this.compareHandValue();

      this.displayResult();
      if (this.player.isBroke() || this.player.isRich()) break;
      this.resetGame();
    }

    this.displayGoodByeMessage();
  }

  resetGame() {
    this.deck.reset();
    this.player.reset();
    this.dealer.reset();
  }

  dealCards() {
    this.deck.deal(this.player);
    this.deck.deal(this.dealer);
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

      this.showCards();
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

  showCards() {
    console.log(`Player cards:`);
    this.player.hand.forEach(card => {
      console.log(`** ${card}`);
    });
    console.log(`>> Hand value: ${this.player.handValue}`);
    this.displayLineBreak();

    console.log(`Dealer cards:`);
    this.dealer.hand.forEach(card => {
      console.log(`** ${card}`);
    });
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
        console.log(`Invalid answer. Please enter 'h' to hit or 's' to stay`);
        answer = readline.prompt().toLowerCase();
      }
    }

    return answer;
  }

  showAllCardsAndValues() {
    this.dealer.hand[1].reveal();
    this.showCards();
    console.log(`>> Hand value: ${this.dealer.handValue}`);
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
    console.log(`You have $${Player.MONEY_TO_START} to start and each round requires a bet of $${Player.AMOUNT_BET}.`);
    console.log(`Play until you are broke or until you have $${Player.RICH}.`);
    this.displayLineBreak();
  }

  displayGoodByeMessage() {
    this.displayLineBreak();
    console.log(`Thank you for playing Twenty-One!`);
  }

  displayBusted() {
    let bustedParticipant;

    if (this.player.isBusted()) bustedParticipant = 'Player';
    else if (this.dealer.isBusted()) bustedParticipant = 'Dealer';

    if (bustedParticipant) console.log(`${bustedParticipant} has busted!`);
  }

  displayResult() {
    this.displayLineBreak();
    this.showAllCardsAndValues();
    this.displayLineBreak();
    this.displayBusted();
    let winner = this.player.won ? 'Player' : 'Dealer';
    console.log(`${winner} wins!`);
    console.log(`Player balance: $${this.player.money}`);
    this.displayLineBreak();
  }

  displayLineBreak() {
    console.log('');
  }
}

let game = new TwentyOneGame();
game.play();

// clear console