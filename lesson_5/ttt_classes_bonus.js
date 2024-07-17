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

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares(keys = Object.keys(this.squares)) {
    return keys.filter(key => this.squares[key].isUnused());
  }

  isUnusedSquare(key) {
    return this.squares[key].isUnused();
  }

  isEmpty() {
    return Object.keys(this.squares).every(key => this.squares[key].isUnused());
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
    this.roundsWon = 0;
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

  static roundsNeededToWinMatch = 3;

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
    this.firstPlayer = this.human;
    this.round = 1;
  }

  playGame() {
    console.clear();
    this.displayWelcomeMessage();

    while (true) {
      this.playRound();

      if (this.someoneWonMatch()) {
        this.displayMatchResults();
        break;
      }

      if (!this.playAgain()) break;
      this.firstPlayer = this.togglePlayer(this.firstPlayer);

      this.board = new Board();
      console.clear();
    }

    this.displayGoodbyeMessage();
  }

  playAgain() {
    let answer = readline.question('Would you like to play another round? (y or n): ').toLowerCase();

    while (true) {
      if (['y', 'n'].includes(answer)) break;
      else {
        answer = readline.question(`Invalid answer. Please select 'y' or 'n': `);
        console.log('');
      }
    }

    return answer === 'y';
  }

  playRound() {
    let currentPlayer = this.firstPlayer;

    if (this.round === 1 && this.board.isEmpty()) {
      this.board.display();
    } else {
      this.displayRoundNumberAndBoard();
    }

    this.displayScore();

    while (true) {
      this.playerMoves(currentPlayer);
      if (this.roundOver()) break;

      console.clear();
      this.displayRoundNumberAndBoard();
      currentPlayer = this.togglePlayer(currentPlayer);
    }

    console.clear();
    this.displayRoundNumberAndBoard();
    this.displayRoundResults();
    this.round += 1;
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

      let offensiveWinningMove = this.computerOffenseToWin();
      if (offensiveWinningMove) return offensiveWinningMove;

      let defensiveMove = this.computerDefense();
      if (defensiveMove) return defensiveMove;

      let offensiveMoveToAdvance = this.computerOffenseToAdvance();
      if (offensiveMoveToAdvance) return offensiveMoveToAdvance;

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

  roundOver() {
    return this.board.isFull() || this.someoneWonRound();
  }

  someoneWonRound() {
    return this.isRoundWinner(this.human) || this.isRoundWinner(this.computer);
  }

  someoneWonMatch() {
    return this.isMatchWinner(this.human) || this.isMatchWinner(this.computer);
  }

  displayWelcomeMessage() {
    console.log(`Welcome to Tic Tac Toe! The first player to win ${TTTGame.roundsNeededToWinMatch} rounds wins the match. Round ${this.round} starts now.`);
    console.log('');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe. Goodbye!');
  }

  displayScore() {
    console.log('');
    console.log(`Human: ${this.human.roundsWon}`);
    console.log(`Computer: ${this.computer.roundsWon}`);
    console.log('');
  }

  displayRoundResults() {
    if (this.isRoundWinner(this.human)) {
      this.human.roundsWon += 1;
      console.log('>> You won the round. Congrats!');
      this.displayScore();
    } else if (this.isRoundWinner(this.computer)) {
      this.computer.roundsWon += 1;
      console.log('>> Computer wins round.');
      this.displayScore();
    } else {
      console.log('>> A tied game. How boring.');
      this.displayScore();
    }
  }

  displayRoundNumber() {
    console.log(`***Round ${this.round}***`);
    console.log('');
  }

  displayRoundNumberAndBoard() {
    this.displayRoundNumber();
    this.board.display();
  }

  isRoundWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  isMatchWinner(player) {
    return player.roundsWon === TTTGame.roundsNeededToWinMatch;
  }

  displayMatchResults() {
    if (this.isMatchWinner(this.human)) {
      console.log('>> You won the match. Congrats!');
    } else if (this.isMatchWinner(this.computer)) {
      console.log('>> Computer wins match.');
    }
    console.log('');
  }

  togglePlayer(player) {
    return player === this.human ? this.computer : this.human;
  }

  playerMoves(currentPlayer) {
    if (currentPlayer === this.human) this.humanMoves();
    else this.computerMoves();
  }
}

let game = new TTTGame();
game.playGame();