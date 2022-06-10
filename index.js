var computer;
var computerScore = 0;
const computerPoint = document.getElementById("computerscore");
computerPoint.innerText = computerScore;

var player;
var playerScore = 0;
const playerPoint = document.getElementById("playerscore");
playerPoint.innerText = playerScore;

var scoreRatio = playerScore + computerScore;
const scoreOverTotal = document.getElementById("winrate");
scoreOverTotal.innerText = scoreRatio;

var playerMove = document.getElementById("player-move");
var computerMove = document.getElementById("computer-move");

var winner;
const winnerShow = document.getElementById("versus-display");

const options = [
  {
    move: "scissors",
    scheme: "fa-solid fa-hand-scissors",
  },
  {
    move: "rock",
    scheme: "fa-solid fa-hand-back-fist",
  },
  {
    move: "paper",
    scheme: "fa-solid fa-hand",
  },
  {
    move: "lizard",
    scheme: "fa-solid fa-hand-lizard",
  },
  {
    move: "spock",
    scheme: "fa-solid fa-hand-spock",
  },
];

function scoreCount() {
    if (winner === "player") {
        playerScore++;
        playerPoint.innerText = playerScore;
    } else if (winner === "computer") {
        computerScore++;
        computerPoint.innerText = computerScore;
    }
    scoreRatio = Math.floor((playerScore / (playerScore + computerScore)) * 100);
    scoreOverTotal.innerText = scoreRatio;
}

function playermove(choice, move) {
  player = move;
  playerMove.className = choice;
  let index = Math.floor(Math.random() * options.length);
  computerMove.className = options[index].scheme;
  computer = options[index].move;
  console.log(computer);
  setWinner();
  // computermove();
}

function setWinner() {
  if (player === computer) {
    winner = "draw";
  } else {
    if (player === "rock") {
      if (computer === "lizard" || computer === "scissors") {
        winner = "player";
      } else {
        winner = "computer";
      }
    } // if rock

    if (player === "paper") {
      if (computer === "rock" || computer === "spock") {
        winner = "player";
      } else {
        winner = "computer";
      }
    } // if paper

    if (player === "scissors") {
      if (computer === "paper" || computer === "lizard") {
        winner = "player";
      } else {
        winner = "computer";
      }
    } // if scissors

    if (player === "spock") {
      if (computer === "rock" || computer === "scissors") {
        winner = "player";
      } else {
        winner = "computer";
      }
    } // if spock

    if (player === "lizard") {
      if (computer === "paper" || computer === "spock") {
        winner = "player";
      } else {
        winner = "computer";
      }
    }
  } // if draw
  winnerShow.innerHTML = winner;
  scoreCount();
} // end function

// function computermove() {
//     let index =  Math.floor(Math.random() * options.length);
//     computerMove.className = options[index].scheme;
//     computer = options[index][move];
//     console.groupCollapsed(computer);
// };

//the addEventListener should have a function pointer of a function returnin another function.
//writing like addEventListener('click', oneFunction(argument)) will trigger the function right away.

const paperbtn = document.getElementById("paper");
paperbtn.addEventListener("click", function () {
  playermove("fa-solid fa-hand", "paper");
});

const rockbtn = document.getElementById("rock");
rockbtn.addEventListener("click", function () {
  playermove("fa-solid fa-hand-back-fist", "rock");
});

const scissorsbtn = document.getElementById("scissors");
scissorsbtn.addEventListener("click", function () {
  playermove("fa-solid fa-hand-scissors", "scissors");
});

const lizardbtn = document.getElementById("lizard");
lizardbtn.addEventListener("click", function () {
  playermove("fa-solid fa-hand-lizard", "lizard");
});

const spockbtn = document.getElementById("spock");
spockbtn.addEventListener("click", function () {
  playermove("fa-solid fa-hand-spock", "spock");
});

// ######## NOT WORKING CODE #############
// function playerChoice (e) {
//     console.log("works");
//     playerMove.className = e.target.value;
//     computerMove.className = options[Math.floor(Math.random() * options.length)];
// }

// const playerBtns = document.querySelectorAll('.button-wrapper button');
// playerBtns.forEach.onClick = playerChoice;
