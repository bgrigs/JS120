const readline = require('readline-sync');

const RPS = {
  game: createNewGame(),
  human: createHuman(),
  computer: createComputer(),
  roundsNeededToWin: 3,

  displayScore() {
    console.log(`
***Score***
    You: ${this.human.roundWins}
    Computer: ${this.computer.roundWins} 
    Ties: ${this.game.round.ties}\n`);
  },

  displayWelcomeMessage() {
    console.log(`Welcome to Rock, Paper, Scissors!
\nThe game will end when a player wins ${this.roundsNeededToWin} rounds.\n`);
  },

  displayGoodbyeMessage() {
    console.log('\nThanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  displayRoundChoices() {
    console.clear();
    console.log(`You chose: ${this.human.move} ${this.displayChoiceEmoji(this.human)}`);
    console.log(
      `The computer chose: ${this.computer.move} ${this.displayChoiceEmoji(this.computer)}`);
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

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'scissors' && computerMove === 'paper') ||
        (humanMove === 'paper' && computerMove === 'rock')) {
      this.human.roundWins += 1;
      console.log('\nYou win the round!');
    } else if ((computerMove === 'rock' && humanMove === 'scissors') ||
               (computerMove === 'scissors' && humanMove === 'paper') ||
               (computerMove === 'paper' && humanMove === 'rock')) {
      console.log('\nComputer wins the round');
      this.computer.roundWins += 1;
    } else {
      console.log("\nIt's a tie");
      this.game.round.ties += 1;
    }
  },

  displayGameWinner() {
    let emoji = this.game.gameWinner === 'You' ? '🎉' : '😔';
    console.log(`\n${emoji.repeat(3)} ${this.game.gameWinner} won ${this.roundsNeededToWin} rounds, winning the game`);
    console.log(`\nYou've won ${this.human.gameWins} game(s). Computer has won ${this.computer.gameWins} game(s)`);
  },

  playRound() {
    console.log(`This is Round ${this.game.round.roundNumber}`);
    this.human.choose();
    this.computer.choose();
    this.displayRoundChoices();
    this.displayRoundWinner();
  },

  playGame() {
    console.clear();
    this.displayWelcomeMessage();

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

  gameWon() {
    if (this.human.roundWins === this.roundsNeededToWin) {
      this.game.gameWinner = 'You';
      this.human.gameWins += 1;
    } else if (this.computer.roundWins === this.roundsNeededToWin) {
      this.game.gameWinner = 'Computer';
      this.computer.gameWins += 1;
    }
    return this.game.gameWinner;
  },

  playAgain() {
    console.log('\nWould you like to play again? (y/n)');

    while (true) {
      let answer = readline.prompt().toLowerCase();
      if (answer !== 'y' && answer !== 'yes'
        && answer !== 'n' && answer !== 'no') {
        console.clear();
        console.log('Sorry, invalid choice. Enter y or n');
        continue;
      }
      console.clear();
      return ['y', 'yes'].includes(answer.toLowerCase());
    }
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
    choose() {
      let choice;

      while (true) {
        console.log('Please choose (r)ock, (p)aper, or (s)cissors:');
        choice = readline.prompt().toLowerCase();
        if (choice === 'r') choice = 'rock';
        if (choice === 'p') choice = 'paper';
        if (choice === 's') choice = 'scissors';
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
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
    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}