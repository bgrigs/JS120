/*
RPS is a two-player game where each player chooses one of three possible moves:
rock, paper, or scissors.
The winner is chosen by comparing their moves with the following rules:

Rock crushes scissors, i.e., rock wins against scissors.
Scissors cuts paper, i.e., scissors beats paper.
Paper wraps rock, i.e., paper beats rock.
If the players chose the same move, the game is a tie.

Nouns: player, move, rule
Verbs: choose, compare

ignore the nouns "rock," "paper," and "scissors": each is a variation of a move.
You can think of them as moves that each have a different state.

Player
 - choose
Move
Rule

???
- compare
*/
const readline = require('readline-sync');

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  round: createRound(),
  roundsNeededToWin: 3,
  gameWinner: null,

  displayScore() {
    console.log(`
***Score***
    You: ${this.human.wins}
    Computer: ${this.computer.wins} 
    Ties: ${this.round.ties}`);
  },

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!\n');
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
      this.human.wins += 1;
      console.log('\nYou win!');
    } else if ((computerMove === 'rock' && humanMove === 'scissors') ||
               (computerMove === 'scissors' && humanMove === 'paper') ||
               (computerMove === 'paper' && humanMove === 'rock')) {
      console.log('\nComputer wins');
      this.computer.wins += 1;
    } else {
      console.log("\nIt's a tie");
      this.round.ties += 1;
    }
  },

  displayGameWinner() {
    let emoji = this.gameWinner === 'You' ? '🎉' : '😔';
    console.log(`\n${emoji.repeat(3)} ${this.gameWinner} won ${this.roundsNeededToWin} rounds, winning the game`);
  },

  playRound() {
    console.log(`\nThis is Round ${this.round.roundNumber}`);
    this.human.choose();
    this.computer.choose();
    this.displayRoundChoices();
    this.displayRoundWinner();
  },

  playGame() {
    console.clear();
    this.displayWelcomeMessage();
    while (this.human.wins < this.roundsNeededToWin &&
      this.computer.wins < this.roundsNeededToWin) {
      this.playRound();
      this.displayScore();
      this.round.roundNumber += 1;
      if (this.human.wins === this.roundsNeededToWin) this.gameWinner = 'You';
      else if (this.computer.wins === this.roundsNeededToWin) this.gameWinner = 'Computer';
      // if (!this.playAgain()) break;
    }

    this.displayGameWinner();
    this.displayGoodbyeMessage();
  },

  playAgain() {
    console.log('\nWould you like to play again? (y/n)');

    while (true) {
      let answer = readline.prompt();
      if (answer !== 'y' && answer !== 'yes'
        && answer !== 'n' && answer !== 'no') {
        console.clear();
        console.log('Sorry, invalid choice. Enter y or n');
        continue;
      }
      console.clear();
      return answer.toLowerCase()[0] === 'y';
    }
  }
};

RPSGame.playGame();

function createRound() {
  return {
    roundNumber: 1,
    ties: 0,
  };
}

function createPlayer() {
  return {
    move: null,
    wins: 0,
  };
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose (r)ock, (p)aper, or (s)cissors:');
        choice = readline.prompt();
        if (choice.toLowerCase() === 'r') choice = 'rock';
        if (choice.toLowerCase() === 'p') choice = 'paper';
        if (choice.toLowerCase() === 's') choice = 'scissors';
        if (['rock', 'paper', 'scissors'].includes(choice.toLowerCase())) break;
        console.clear();
        console.log('Sorry, invalid choice.');
      }

      this.move = choice.toLowerCase();
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