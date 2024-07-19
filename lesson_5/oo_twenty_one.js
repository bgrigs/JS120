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
  static  RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10',
    'Jack', 'Queen', 'King', 'Ace'];

  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.hidden = false;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    Card.SUITS.forEach(suit => {
      Card.RANKS.forEach(rank => {
        this.cards.push(`${rank} of ${suit}`);
      });
    });

    shuffle(this.cards);
  }

  deal(participant) {
    console.log(this.cards);
    participant.hand = [this.cards.pop(), this.cards.pop()];
  }
}

class Participant {
  constructor() {
    // STUB
    // Score? Hand? Amount of money available?
    // What else goes here? all the redundant behaviors from Player and Dealer?
  }
}

class Player extends Participant {
  constructor() {
    super();
    this.hand = [];
  }

  hit() {
    // STUB
  }

  stay() {
    // STUB
  }

  isBusted() {
    // STUB
  }

  score() {
    // STUB
  }
}

class Dealer extends Participant {
  // Very similar to a Player; do we need this?

  constructor() {
    super();
    this.hand = [];
    // STUB
    // What sort of state does a dealer need?
    // Score? Hand? Deck of cards?
  }

  hit() {
    //STUB
  }

  stay() {
    //STUB
  }

  isBusted() {
    //STUB
  }

  score() {
    //STUB
  }

  hide() {
    //STUB
  }

  reveal() {
    //STUB
  }
}

class TwentyOneGame {
  constructor() {
    // STUB
    // What sort of state does the game need?
    // A deck? Two participants?
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }

  start() {
    // SPIKE
    this.displayWelcomeMessage();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
    this.displayGoodByeMessage();
  }

  dealCards() {
    this.deck.deal(this.player);
    this.deck.deal(this.dealer);
    console.log(this.player.hand);
  }

  showCards() {
    console.log(`Player cards:`);
    this.player.hand.forEach(card => {
      console.log(`** ${card}`);
    });
    console.log('');
    console.log(`Dealer cards:`);

    this.dealer.hand.forEach(card => {
      console.log(`** ${card}`);
    });
  }

  playerTurn() {

  }

  dealerTurn() {

  }

  displayWelcomeMessage() {
    console.log('Welcome to Twenty-One');
  }

  displayGoodByeMessage() {

  }

  displayResult() {

  }
}

let game = new TwentyOneGame();
game.start();