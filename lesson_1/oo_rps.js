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

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!\n');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  displayRoundWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.clear();
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'scissors' && computerMove === 'paper') ||
        (humanMove === 'paper' && computerMove === 'rock')) {
      console.log('\nYou win!');
    } else if ((computerMove === 'rock' && humanMove === 'scissors') ||
               (computerMove === 'scissors' && humanMove === 'paper') ||
               (computerMove === 'paper' && humanMove === 'rock')) {
      console.log('\nComputer wins');
    } else {
      console.log("\nIt's a tie");
    }
  },

  play() {
    console.clear();
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayRoundWinner();
      if (!this.playAgain()) break;
    }

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

RPSGame.play();

function createPlayer() {
  return {
    move: null,
  };
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, or scissors:');
        choice = readline.prompt();
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


// function createMove() {
//   return {
//     // possible state: type of move (paper, rock, scissors)
//   };
// }

// function createRule() {
//   return {
//     // possible state? not clear whether Rules need state
//   };
// }

// // Since we don't yet know where to put `compare`, let's define
// // it as an ordinary function.
// let compare = function(move1, move2) {
//   // not yet implemented
// };