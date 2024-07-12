let readline = require('readline-sync');

class Square {
  static UNUSED_SQUARE = ' ';
  static HUMAN_MARKER = 'X';
  static COMPUTER_MARKER = 'O';

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let counter = 1; counter <= 9; counter += 1) {
      this.squares[String(counter)] = new Square();
    }
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares['1']}  |  ${this.squares['2']}  |  ${this.squares['3']}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares['4']}  |  ${this.squares['5']}  |  ${this.squares['6']}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares['7']}  |  ${this.squares['8']}  |  ${this.squares['9']}`);
    console.log("     |     |");
    console.log("");
  }

  displayWithClear() {
    console.clear();
    console.log('');
    this.display();
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares(keys = Object.keys(this.squares)) {
    return keys.filter(key => this.squares[key].isUnused());
  }

  isUnusedSquare(key) {
    return this.squares[key].isUnused();
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    ['1', '2', '3'], // top row
    ['4', '5', '6'], // center row
    ['7', '8', '9'], // bottom row
    ['1', '4', '7'], // left column
    ['2', '5', '8'], // middle column
    ['3', '6', '9'], // right column
    ['1', '5', '9'], // diagonal, top left to bottom right
    ['3', '5', '7'], // diagonal, top right to bottom left
  ];

  static joinOr(choices, punctuation = ', ', word = 'or') {
    if (choices.length === 1) {
      return choices[0].toString();
    } else if (choices.length === 2) {
      return choices.join(` ${word} `);
    } else {
      return `${choices.slice(0, -1).join(punctuation)}${punctuation}${word} ${choices.slice(-1)}`;
    }
  }

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  /*
- playGame
  - welcome player

    - playRound
      - display board
      - turn taking, checking for game over etc
      - display board
      - display results
      - ask to play again
        - if y
          - clear board
          - continue to top
        - if n
          -break

  - say goodbye
  */

  playGame() {
    console.clear();
    this.displayWelcomeMessage();

    while (true) {
      this.playRound();
      if (!this.playAgain()) break;
      console.clear();
      console.log();
      this.board = new Board();
    }

    this.displayGoodbyeMessage();
  }

  playAgain() {
    let answer = readline.question('Would you like to play again? (y or n): ');

    while (true) {
      if (answer.toLowerCase() === 'y') return true;
      if (answer.toLowerCase() === 'n') return false;
      else {
        answer = readline.question(`Invalid answer. Please select 'y' or 'n': `);
        console.log();
      }
    }
  }

  playRound() {
    this.board.display();

    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      this.board.displayWithClear();
    }

    this.board.displayWithClear();
    this.displayResults();
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${TTTGame.joinOr(validChoices)}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log('Sorry, not a valid choice');
      console.log('');
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let choice = this.computerFindsBestMove();
    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  computerFindsBestMove() {
    while (true) {
      if (this.centerSquareAvailable()) return this.chooseCenterSquare();

      let offensiveMove = this.computerOffenseToWin();
      if (offensiveMove) return offensiveMove;

      let defensiveMove = this.computerDefense();
      if (defensiveMove) return defensiveMove;

      offensiveMove = this.computerOffenseToAdvance();
      if (offensiveMove) return offensiveMove;

      else return this.computerRandomMove();
    }
  }

  centerSquareAvailable() {
    return this.board.isUnusedSquare('5');
  }

  chooseCenterSquare() {
    return '5';
  }

  computerOffenseToWin() {
    let rowToWin = this.findCriticalRow(this.computer);
    if (rowToWin) return this.findCriticalSquare(rowToWin);

    return null;
  }

  computerOffenseToAdvance() {
    let rowToAdvance = this.findRowToAdvance();
    if (rowToAdvance) return this.findSquareToAdvance(rowToAdvance);

    return null;
  }

  computerDefense() {
    let rowToDefend = this.findCriticalRow(this.human);
    if (!rowToDefend) return null;
    return this.findCriticalSquare(rowToDefend);
  }

  findCriticalSquare(row) {
    let index = row.findIndex(key => this.board.isUnusedSquare(key));
    return row[index];
  }

  findRowToAdvance() {
    return this.findCriticalRow(this.computer, 1, 2);
  }

  findSquareToAdvance(row) {
    let openSquares = row.filter(key => this.board.isUnusedSquare(key));
    let randomIndex = Math.floor(openSquares.length * Math.random());
    return openSquares[randomIndex];
  }

  findCriticalRow(player, squaresMarked = 2, openSquares = 1) {
    let row;

    let criticalRows = TTTGame.POSSIBLE_WINNING_ROWS.filter(row => {
      return this.board.countMarkersFor(player, row) === squaresMarked &&
      this.board.unusedSquares(row).length === openSquares;
    });

    if (criticalRows.length === 1) {
      row = criticalRows.flat();
    } else if (criticalRows.length > 1) {
      let randomIndex =  Math.floor((criticalRows.length * Math.random()));
      row = criticalRows[randomIndex];
    }

    return row;
  }

  computerRandomMove() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));

    return choice;
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  displayWelcomeMessage() {
    console.log('Welcome to Tic Tac Toe!');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe. Goodbye!');
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log('You won. Congrats!');
    } else if (this.isWinner(this.computer)) {
      console.log('Computer wins.');
    } else {
      console.log('A tied game. How boring.');
    }
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }
}

let game = new TTTGame();
game.playGame();