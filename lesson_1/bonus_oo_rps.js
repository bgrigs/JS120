const readline = require('readline-sync');

const ROUNDS_TO_WIN = 3;

const MOVES = {
  winningMoves: {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['paper', 'spock'],
    spock: ['scissors', 'rock'],
  },

  winningMoveMessages: [
    'Scissors cut paper',
    'Paper covers rock',
    'Rock crushes lizard',
    'Lizard poisons Spock',
    'Spock melts scissors',
    'Scissors decapitate lizard',
    'Lizard eats paper',
    'Paper disproves Spock',
    'Spock vaporizes rock',
    'Rock breaks scissors',
  ],
};

const RPS = {
  nameOfGame: 'Rock, Paper, Scissors, Lizard, Spock',
  game: createNewGame(),
  human: createHuman(),
  computer: createComputer(),
  invalidChoiceMsg: 'Sorry, invalid choice',
  choices: Object.keys(MOVES.winningMoves),

  playGame() {
    console.clear();
    this.displayWelcomeMessage();

    while (!this.gameWon()) {
      this.playRound();
      this.displayScore();
      this.game.round.roundNumber += 1;
    }

    this.displayGameWinner();
    if (this.playAgain()) {
      this.game = createNewGame();
      this.human.roundWins = 0;
      this.computer.roundWins = 0;
      this.playGame();
    } else {
      this.displayGoodbyeMessage();
    }
  },

  playRound() {
    let roundNumber = this.game.round.roundNumber;
    console.log(`Press enter to start Round ${roundNumber}`);
    let ready = readline.prompt().trim();
    console.clear();

    while (true) {
      if (ready === '') {
        console.log(`*** Round ${roundNumber} ***\n`);
        this.human.choose();
        this.computer.choose();
        this.displayRoundChoices();
        this.displayRoundWinner();
        break;
      } else {
        console.log(this.invalidChoiceMsg);
        console.log('Press enter if you are ready for the next round');
        ready = readline.question().trim();
      }
    }
  },

  gameWon() {
    if (this.human.roundWins === ROUNDS_TO_WIN) {
      this.game.gameWinner = `${this.human.name}`;
      this.human.gameWins += 1;
    } else if (this.computer.roundWins === ROUNDS_TO_WIN) {
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
\nThe game will end when a player wins ${ROUNDS_TO_WIN} rounds.\n`);
  },

  displayScore() {
    console.log(`
⭐ Score ⭐
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
    if (player.move === 'paper') choiceEmoji = '📰';
    if (player.move === 'scissors') choiceEmoji = '✂️';
    if (player.move === 'lizard') choiceEmoji = '🦎';
    if (player.move === 'spock') choiceEmoji = '🖖';

    return choiceEmoji;
  },

  displayRoundWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if (MOVES.winningMoves[humanMove].includes(computerMove)) {
      this.human.roundWins += 1;
      this.displayWinningMove(humanMove, computerMove);
      console.log(`\n${this.human.name} win the round! 🙌`);
    } else if (MOVES.winningMoves[computerMove].includes(humanMove)) {
      this.displayWinningMove(humanMove, computerMove);
      console.log(`\n${this.computer.name} wins the round ⛔`);
      this.computer.roundWins += 1;
    } else {
      console.log("\nIt's a tie");
      this.game.round.ties += 1;
    }
  },

  displayGameWinner() {
    let emoji = this.game.gameWinner === `${this.human.name}` ? '🎉' : '😔';
    console.log(`\n${emoji.repeat(3)} ${this.game.gameWinner} won ${ROUNDS_TO_WIN} rounds, winning the game`);
    console.log(`\nYou've won ${this.human.gameWins} game(s). ${this.computer.name} has won ${this.computer.gameWins} game(s)`);
  },

  displayWinningMove(humanMove, computerMove) {
    let message = MOVES.winningMoveMessages.filter(msg => {
      msg = msg.toLowerCase();
      return msg.includes(humanMove.toLowerCase())
      && msg.includes(computerMove.toLowerCase());
    })[0];

    console.log(`\n>>> ${message} <<<`);
  }
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
        console.log('Please choose (r)ock, (p)aper, (sc)issors, (l)izard, or (sp)ock:');
        choice = readline.prompt().toLowerCase();
        if (['r', 'p', 'sc', 'l', 'sp'].includes(choice)) choice = matchChoice(choice);
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


function matchChoice(choice) {
  if (choice === 'r') return 'rock';
  if (choice === 'p') return 'paper';
  if (choice === 'sc') return 'scissors';
  if (choice === 'l') return 'lizard';
  if (choice === 'sp') return 'spock';
  return null;
}