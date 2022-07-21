// const rulesDisplay = document.getElementById("rules"); //rules display
const closeRules = document.getElementById("closerules");
closeRules.addEventListener("click", function () {
  rulesDisplay.style.display = "none"; //close rules window
});


//###### rules object ######
const rules = {
  showRulesBtn() {document.getElementById("rulesbtn").addEventListener("click", this.showRules())},
  closeRulesBtn() {document.getElementById("closerules").addEventListener("click", this.closeRules())},
  closeRules() {
    document.getElementById("rules").style.display = "none";
  },
  showRules () {
    document.getElementById("rules").style.display = "block";
  }
}
//###### end rules object #######

const showRulesBtn = document.getElementById("rulesbtn");
showRulesBtn.addEventListener("click", function () {
  rulesDisplay.style.display = "block"; //open rules window
});

const resetGame = document.getElementById("reset-game");
resetGame.addEventListener("click", function () {
  computerPoint.innerText = 0;
  computerScore = 0;
  playerPoint.innerText = 0;
  playerScore = 0;
  winnerShow.innerHTML = "";
  scoreOverTotalAbove.innerText = 0 + "%"; //sets the % number
  ratioHealth.style.width = 50 + "%";
  playerMove.className = "";
  computerMove.className = "";
})

const shadebg = document.getElementById("bkgroundtrue");
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

//####Score object ####
const score = {
  player: {
    score: 0,
    addPoints() {
      this.score++;
      document.getElementById("playerscore").innerText = this.score;
      score.scoreRatioCalc();
    }
  },
  computer: {
    score: 0,
    addPoints() {
      this.score++;
      document.getElementById("computerscore").innerText = this.score;
      score.scoreRatioCalc();
    }
  },
  scoreCount() {
    if (winner === "player") {
      this.player.addPoints();
    } else if (winner === "computer") {
      this.computer.addPoints();
    }
  },
  scoreRatio: 0,
  scoreRatioCalc() {
    this.scoreRatio = Math.floor((this.player.score / (this.player.score + this.computer.score)) * 100); //calculates the score in % with floor.
    document.getElementById("healthpercabove").innerText = this.scoreRatio + "%"; //sets the % number
    ratioHealth.style.width = this.scoreRatio + "%"; //sets the health bar length
  
    if (this.scoreRatio > 95) {
      ratioHealth.style.borderRadius = "10px";
    } else if (this.scoreRatio < 5) {
      ratioHealth.style.width = "2%";
    } else {
      ratioHealth.style.borderRadius = "10px 0 0 10px";
    }
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

// Controller Object

/// ############ controller object ##########
const controller = {
  paper: {
    handler: document.getElementById("paper"),
    icon: "fa-solid fa-hand",
    value: "paper",

  },
  rock: {
    handler: document.getElementById("rock"),
    icon: "fa-solid fa-hand-back-fist",
    value: "rock"

  },
  scissors: {
    handler: document.getElementById("scissors"),
    icon: "fa-solid fa-hand-scissors",
    value: "scissors"
  },
  lizard: {
    handler: document.getElementById("lizard"),
    icon: "fa-solid fa-hand-lizard",
    value: 'lizard'
  },
  spock: {
    handler: document.getElementById("spock"),
    icon: "fa-solid fa-hand-spock",
    value: "spock"
  }

};
// ############# end controller object ############

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
    paperbtn.disabled = true;
    rockbtn.disabled = true;
    scissorsbtn.disabled = true;
    lizardbtn.disabled = true;
    spockbtn.disabled = true;
    // disabled the buttons. Now I need to create a css pseudo selector to disable components
    // and change the disabled buttons - :disabled

    versusCard.style.opacity = 0;
    let id = null; 
    let index = 0;
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
      if (index === 100) {
        clearInterval(id);
        paperbtn.disabled = false;
        rockbtn.disabled = false;
        scissorsbtn.disabled = false;
        lizardbtn.disabled = false;
        spockbtn.disabled = false;
       } else if (index < 50) {
        index++; 
        // alter the logic to a effect close to previous with less code.
        playerCard.style.opacity = index/50; 
        playerCard.style.top = index - 50 + "px"; 
        computerCard.style.opacity = index/50; 
        computerCard.style.top = index - 50 + "px"; 
        } else if (index >= 50) {
          versusCard.style.opacity = index/99; 
          index++
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
