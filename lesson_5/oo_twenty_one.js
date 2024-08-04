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
  constructor() {
    this.hand = [];
    this.handValue = 0;
    this.busted = false;
    this.won = false;
    this.stayed = false;
    // STUB
    // Score? Hand? Amount of money available?
    // What else goes here? all the redundant behaviors from Player and Dealer?
  }

  updateHandValue() {
    let handValue = 0;
    this.hand.forEach(card => {
      if (card.isFaceCard(card.rank)) {
        handValue += 10;
      } else if (card.isAce(card.rank)) {
        handValue += 11;
      } else {
        handValue += Number(card.rank);
      }
    });
    this.handValue = handValue;
  }

  isBusted() {
    return this.handValue > 21;
  }
}

class Player extends Participant {
  constructor() {
    super();
    // this.updateHandValue();
    // this.hand = [];
  }

  // stay() {
  //   // STUB
  // }

  has21() {
    return this.handValue === 21;
  }

  score() {
    // STUB
  }
}

class Dealer extends Participant {
  // Very similar to a Player; do we need this?

  constructor() {
    super();
    // this.hand = [];
    // STUB
    // What sort of state does a dealer need?
    // Score? Hand? Deck of cards?
  }

  // hit() {
  //   //STUB
  // }

  stay() {
    //STUB
  }


  score() {
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
    if (!this.player.busted && !this.player.won) {
      this.dealerTurn();
    }
    this.displayResult();
    this.displayGoodByeMessage();
  }

  dealCards() {
    this.deck.deal(this.player);
    this.deck.deal(this.dealer);
    this.dealer.hand[1].hide();
  }

  showCards() {
    console.log(`Player cards:`);
    this.player.hand.forEach(card => {
      console.log(`** ${card}`);
    });
    this.player.updateHandValue();
    console.log(`>> Hand value: ${this.player.handValue}`);
    console.log('');

    console.log(`Dealer cards:`);

    this.dealer.hand.forEach(card => {
      console.log(`** ${card}`);
    });
  }

  playerTurn() {
    while (true) {
      this.player.updateHandValue();

      console.log(`busted true or false: ${this.player.isBusted()}`);
      if (this.player.isBusted()) {
        this.player.busted = true;
        this.dealer.won = true;
        break;
      }

      if (this.player.has21()) {
        this.player.won = true;
        break;
      }

      let move = this.hitOrStay();
      if (move === 'h' || move === 'hit') this.deck.hit(this.player);
      else break;
      this.showCards();
    }
  }

  hitOrStay() {
    console.log('Would you like to (h)it or (s)tay?');
    let answer = readline.prompt().toLowerCase();

    while (true) {
      if (['h', 'hit', 's', 'stay'].includes(answer)) break;

      else console.log(`Invalid answer. Please enter 'h' to hit or 's' to stay`);
    }

    return answer;
  }

  dealerTurn() {
    while (true) {
      this.dealer.updateHandValue();

      if (this.dealer.isBusted()) {
        this.dealer.busted = true;
        this.player.won = true;
        this.showAllCards();
        break;
      }

      if (this.dealer.handValue >= 17) {
        this.showAllCards();
        break;
      }

      this.deck.hit(this.dealer);
    }
  }

  showAllCards() {
    this.dealer.hand[1].reveal();
    this.showCards();
  }

  displayWelcomeMessage() {
    console.log('Welcome to Twenty-One!');
    console.log('');
  }

  displayGoodByeMessage() {
    // console.log(`Thank you for playing Twenty-One!`);
  }

  displayResult() {
    let winner = this.player.won ? 'Player' : 'Dealer';
    console.log(`${winner} wins!`);
  }
}

let game = new TwentyOneGame();
game.start();