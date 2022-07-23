
//###### rules object ######
const rules = {
  showRulesBtn() {document.getElementById("rulesbtn").addEventListener("click", function() {rules.showRules()})},
  closeRulesBtn() {document.getElementById("closerules").addEventListener("click", function() {rules.closeRules()})},
  closeRules() {
    document.getElementById("rules").style.display = "none";
  },
  showRules () {
    document.getElementById("rules").style.display = "block";
  }
}
//###### end rules object #######


//####### events related to rules object ######
const closeRules = document.getElementById("closerules");
closeRules.addEventListener("click", function() {rules.closeRules()}); //close rules window

const showRulesBtn = document.getElementById("rulesbtn");
showRulesBtn.addEventListener("click", function() {rules.showRules()}); //open rules window

const shadebg = document.getElementById("bkgroundtrue");
shadebg.addEventListener("click", function () {rules.closeRules()}); //close rules window when clicking in the dark background
//####### end of events related to rules object ######

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


//########## model object #######

const model = {
  startRound(player, icon) {
      this.playerMoveIcon = icon;
      this.playerMove = player;
      this.setComputerMove();
  },
  playerMoveIcon: '',
  playerMove: '',
  computerMove: '',
  setComputerMove() {
      let index = Math.floor(Math.random() * this.moveOptions.length);
      document.getElementById("computer-move").className = this.moveOptions[index].scheme;
      this.computerMove = this.moveOptions[index].move;
      this.setWinner();
  },
  roundWinner: '',
  moveOptions: [
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
  ],
  setWinner() {
    //function with logic to determine the winner
    if (this.playerMove === this.computerMove) {
      this.roundWinner = "draw";
    } else {
      if (this.playerMove === "rock") {
        if (this.computerMove === "lizard" || this.computerMove === "scissors") {
          this.roundWinner = "player";
        } else {
          this.roundWinner = "computer";
        }
      } // if rock
  
      if (this.playerMove === "paper") {
        if (this.computerMove === "rock" || this.computerMove === "spock") {
          this.roundWinner = "player";
        } else {
          this.roundWinner = "computer";
        }
      } // if paper
  
      if (this.playerMove === "scissors") {
        if (this.computerMove === "paper" || this.computerMove === "lizard") {
          this.roundWinner = "player";
        } else {
          this.roundWinner = "computer";
        }
      } // if scissors
  
      if (this.playerMove === "spock") {
        if (this.computerMove === "rock" || this.computerMove === "scissors") {
          this.roundWinner = "player";
        } else {
          this.roundWinner = "computer";
        }
      } // if spock
  
      if (this.playerMove === "lizard") {
        if (this.computerMove === "paper" || this.computerMove === "spock") {
          this.roundWinner = "player";
        } else {
          this.roundWinner = "computer";
        }
      }
    } // if draw
    winnerShow.innerHTML = this.roundWinner; //sets the winner variable to the round's winner
    document.getElementById("player-move").className = this.playerMoveIcon;
    score.scoreCount(this.roundWinner); //triggers score counting function.
    animateCard(); //triggers the card animation.
  } // end function
  
  
};

// end of model object #########


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
  scoreCount(winner) {
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
  model.startRound('paper', "fa-solid fa-hand");
});

const rockbtn = document.getElementById("rock"); //rock button DOM
rockbtn.addEventListener("click", function () {
  model.startRound('rock', "fa-solid fa-hand-back-fist");
});

const scissorsbtn = document.getElementById("scissors"); //scissors button DOM
scissorsbtn.addEventListener("click", function () {
  model.startRound('scissors', "fa-solid fa-hand-scissors");
});

const lizardbtn = document.getElementById("lizard"); //lizard button DOM
lizardbtn.addEventListener("click", function () {
  model.startRound('lizard', "fa-solid fa-hand-lizard");
});

const spockbtn = document.getElementById("spock"); //spock button DOM
spockbtn.addEventListener("click", function () {
  model.startRound('spock', "fa-solid fa-hand-spock");
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
