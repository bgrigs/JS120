const readline = require('readline-sync');

const RPS = {
  nameOfGame: 'Rock, Paper, Scissors',
  game: createNewGame(),
  human: createHuman(),
  computer: createComputer(),
  winningMoves: {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  },
  choices: null,
  invalidChoiceMsg: 'Sorry, invalid choice',
  roundsNeededToWin: 3,

  playGame() {
    console.clear();
    this.displayWelcomeMessage();
    this.choices = Object.keys(this.winningMoves);

    while (!this.gameWon()) {
      this.playRound();
      this.displayScore();
      this.game.round.roundNumber += 1;
      if (this.gameWon()) {
        this.displayGameWinner();
        if (this.playAgain()) {
          this.game = createNewGame();
          this.human.roundWins = 0;
          this.computer.roundWins = 0;
          this.playGame();
        } else {
          this.displayGoodbyeMessage();
        }
      }
    }
  },

  playRound() {
    console.log(`This is Round ${this.game.round.roundNumber}`);
    this.human.choose();
    this.computer.choose();
    this.displayRoundChoices();
    this.displayRoundWinner();
  },

  gameWon() {
    if (this.human.roundWins === this.roundsNeededToWin) {
      this.game.gameWinner = `${this.human.name}`;
      this.human.gameWins += 1;
    } else if (this.computer.roundWins === this.roundsNeededToWin) {
      this.game.gameWinner = `${this.computer.name}`;
      this.computer.gameWins += 1;
    }
    return this.game.gameWinner;
  },

  playAgain() {
    console.log('\nWould you like to play again? (y/n)');
    const validAnswers = ['y', 'yes', 'n', 'no'];
    const affirmativeAnswers = validAnswers.slice(0, 2);

    while (true) {
      let answer = readline.prompt().toLowerCase();
      if (!validAnswers.includes(answer)) {
        console.clear();
        console.log(`${this.invalidChoiceMsg}. Enter y or n`);
        continue;
      }
      console.clear();
      return affirmativeAnswers.includes(answer.toLowerCase());
    }
  },

  displayWelcomeMessage() {
    console.log(`Welcome to ${this.nameOfGame}!
\nThe game will end when a player wins ${this.roundsNeededToWin} rounds.\n`);
  },

  displayScore() {
    console.log(`
***Score***
    ${this.human.name}: ${this.human.roundWins}
    ${this.computer.name}: ${this.computer.roundWins} 
    Ties: ${this.game.round.ties}\n`);
  },

  displayGoodbyeMessage() {
    console.log(`Thanks for playing ${this.nameOfGame}. Goodbye!`);
  },

  displayRoundChoices() {
    console.clear();
    console.log(`${this.human.name} chose: ${this.human.move} ${this.displayChoiceEmoji(this.human)}`);
    console.log(
      `${this.computer.name} chose: ${this.computer.move} ${this.displayChoiceEmoji(this.computer)}`);
  },

  displayChoiceEmoji(player) {
    let choiceEmoji;
    if (player.move === 'rock') choiceEmoji = '🪨';
    if (player.move === 'paper') choiceEmoji = '🧻';
    if (player.move === 'scissors') choiceEmoji = '✂️';

    return choiceEmoji;
  },

  displayRoundWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if (this.winningMoves[humanMove].includes(computerMove)) {
      this.human.roundWins += 1;
      console.log(`\n${this.human.name} win the round!`);
    } else if (this.winningMoves[computerMove].includes(humanMove)) {
      console.log(`\n${this.computer.name} wins the round`);
      this.computer.roundWins += 1;
    } else {
      console.log("\nIt's a tie");
      this.game.round.ties += 1;
    }
  },

  displayGameWinner() {
    let emoji = this.game.gameWinner === `${this.human.name}` ? '🎉' : '😔';
    console.log(`\n${emoji.repeat(3)} ${this.game.gameWinner} won ${this.roundsNeededToWin} rounds, winning the game`);
    console.log(`\nYou've won ${this.human.gameWins} game(s). ${this.computer.name} has won ${this.computer.gameWins} game(s)`);
  },
};

RPS.playGame();

function createNewGame() {
  return {
    round: createRound(),
    gameWinner: null,
  };
}

function createRound() {
  return {
    roundNumber: 1,
    ties: 0,
  };
}

function createPlayer() {
  return {
    move: null,
    roundWins: 0,
    gameWins: 0,
  };
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    name: 'You',

    choose() {
      let choice;

      while (true) {
        console.log('Please choose (r)ock, (p)aper, or (s)cissors:');
        choice = readline.prompt().toLowerCase();
        if (choice === 'r') choice = 'rock';
        if (choice === 'p') choice = 'paper';
        if (choice === 's') choice = 'scissors';
        if (RPS.choices.includes(choice)) break;
        console.clear();
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    name: 'Computer',

    choose() {
      let randomIndex = Math.floor(Math.random() * RPS.choices.length);
      this.move = RPS.choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}
