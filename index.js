const rulesDisplay = document.getElementById("rules"); //rules display
const closeRules = document.getElementById("closerules");
closeRules.addEventListener("click", function () {
  rulesDisplay.style.display = "none"; //close rules window
});

const showRulesBtn = document.getElementById("show-rules");
showRulesBtn.addEventListener("click", function () {
  rulesDisplay.style.display = "block"; //open rules window
});

const shadebg = document.getElementById("darkbkground");
shadebg.addEventListener("click", function () {
  rulesDisplay.style.display = "none"; //close rules window when clicking in the dark background
});

// #### main game logic ####

var computer;
var computerScore = 0;
const computerPoint = document.getElementById("computerscore");
computerPoint.innerText = computerScore; //computer point DOM

var player;
var playerScore = 0;
const playerPoint = document.getElementById("playerscore");
playerPoint.innerText = playerScore; //player points DOM

var scoreRatio;
const scoreOverTotalAbove = document.getElementById("healthpercabove"); //health percentage score DOM
// scoreOverTotal.innerText = scoreRatio;

var playerMove = document.getElementById("player-move"); //player move show DOM
var computerMove = document.getElementById("computer-move"); //computer move show DOM

var winner; // variable that holds the winner.

const winnerShow = document.getElementById("versus-display"); //winner show DOM

var ratioHealth = document.getElementById("winrate"); //health bar ratio DOM

const options = [
  //move options to be used by the computer
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

function playermove(choice, move) {
  versusCard.style.opacity = 0; //The animation wasn't working properly. Sometimes, the versus card would
                                // stay visible while the other card were loading. Maybe this is an easy fix.
                                // Maybe not the best approach.
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
  
  //function with logic to determine the winner
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
  winnerShow.innerHTML = winner; //sets the winner variable to the round's winner
  scoreCount(); //triggers score counting function.
  animateCard(); //triggers the card animation.
} // end function

// ##### Score logic #####
function scoreCount() {
  //function takes account of the score using the winner variable
  if (winner === "player") {
    playerScore++;
    playerPoint.innerText = playerScore;
  } else if (winner === "computer") {
    computerScore++;
    computerPoint.innerText = computerScore;
  }
  scoreRatio = Math.floor((playerScore / (playerScore + computerScore)) * 100); //calculates the score in % with floor.
  scoreOverTotalAbove.innerText = scoreRatio + "%"; //sets the % number
  ratioHealth.style.width = scoreRatio + "%"; //sets the health bar length

  if (scoreRatio > 95) {
    ratioHealth.style.borderRadius = "10px";
  } else if (scoreRatio < 5) {
    ratioHealth.style.width = "2%";
  } else {
    ratioHealth.style.borderRadius = "10px 0 0 10px";
  }
}

// function computermove() {
//     let index =  Math.floor(Math.random() * options.length);
//     computerMove.className = options[index].scheme;
//     computer = options[index][move];
//     console.groupCollapsed(computer);
// };

//the addEventListener should have a function pointer of a function returnin another function.
//writing like addEventListener('click', oneFunction(argument)) will trigger the function right away.

const paperbtn = document.getElementById("paper"); //paper button DOM
paperbtn.addEventListener("click", function () {
  playermove("fa-solid fa-hand", "paper");
});

const rockbtn = document.getElementById("rock"); //rock button DOM
rockbtn.addEventListener("click", function () {
  playermove("fa-solid fa-hand-back-fist", "rock");
});

const scissorsbtn = document.getElementById("scissors"); //scissors button DOM
scissorsbtn.addEventListener("click", function () {
  playermove("fa-solid fa-hand-scissors", "scissors");
});

const lizardbtn = document.getElementById("lizard"); //lizard button DOM
lizardbtn.addEventListener("click", function () {
  playermove("fa-solid fa-hand-lizard", "lizard");
});

const spockbtn = document.getElementById("spock"); //spock button DOM
spockbtn.addEventListener("click", function () {
  playermove("fa-solid fa-hand-spock", "spock");
});

// ####### Animation logic #######

const playerCard = document.getElementById('player-card');
const computerCard = document.getElementById('computer-card');
const versusCard = document.getElementById('versus-card');
computerMove;

function animateCard() {
    versusCard.style.opacity = 0;
    let id = null; 
    let index = 0;
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
      if (index === 200) {
        clearInterval(id);
       } else {
        index++; 
        playerCard.style.opacity = index/100; 
        playerCard.style.top = index/2 - 100 + "px"; 
        computerCard.style.opacity = index/100; 
        computerCard.style.top = index/2 - 100 + "px"; 
        versusCard.style.opacity = (index - 100)/100; 
        }

      

      
    }
  


} // end function

// ######## NOT WORKING CODE #############
// function playerChoice (e) {
//     console.log("works");
//     playerMove.className = e.target.value;
//     computerMove.className = options[Math.floor(Math.random() * options.length)];
// }

// const playerBtns = document.querySelectorAll('.button-wrapper button');
// playerBtns.forEach.onClick = playerChoice;
