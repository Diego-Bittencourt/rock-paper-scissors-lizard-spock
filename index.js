//------ handlers related to rules object ------
const rulesDisplay = document.getElementById("rules");
const rulesWrapperStyle = document.getElementById("rules-wrapper").style;

const closeRules = document.getElementById("closerules");
closeRules.addEventListener("click", function () {
  rules.exitAnimation();
}); //close rules window

const showRulesBtn = document.getElementById("rulesbtn");
showRulesBtn.addEventListener("click", function () {
  rules.showRules();
}); //open rules window

const shadebg = document.getElementById("bkgroundtrue");
shadebg.addEventListener("click", function () {
  rules.closeRules();
}); //close rules window when clicking in the dark background

//------- end of handlers related to rules object -------

//###### rules object ######
const rules = {
  closeRules() {
    rulesDisplay.style.display = "none";
  },
  showRules() {
    rulesDisplay.style.display = "block";
    rulesWrapperStyle.transform = "scale(1)";
    rulesWrapperStyle.borderRadius = "0%";
  },
  exitAnimation() {
    let id = null;
    let index = 1;
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
      if (index === 100) {
        rules.closeRules(); 
        clearInterval(id);
      } 
      else if (index < 50) {
        rulesWrapperStyle.transform = "scale(" + (1 - index/50) + ")";
        // rulesWrapperStyle.transform = scale(0.8);
        index++;
      } 
      else if (index >= 50 && index < 100) {
        rulesWrapperStyle.transform = "scale(0.001)";
        index++;
      }
    }
  }
};
//###### end rules object #######

//---------Button handlers ----------
const paperbtn = document.getElementById("paper"); //paper button DOM
const rockbtn = document.getElementById("rock"); //rock button DOM
const scissorsbtn = document.getElementById("scissors"); //scissors button DOM
const lizardbtn = document.getElementById("lizard"); //lizard button DOM
const spockbtn = document.getElementById("spock"); //spock button DOM
const resetGame = document.getElementById("reset-game");//Reset Game Button

//---------End of Button Handlers --------


// --------- Handlers related to the animation object ---------
const winnerShow = document.getElementById("versus-display"); //winner show DOM
const playerMove = document.getElementById("player-move"); //player move show DOM
const computerMove = document.getElementById("computer-move"); //computer move show DOM
const playerCard = document.getElementById("player-card");//player move display
const computerCard = document.getElementById("computer-card");//computer move display
const versusCard = document.getElementById("versus-card");//winner display
// --------- End of the handlers related to the animation object ---------

//##### animation object ######

const animation = {
  animateRound() {
    animation.disableButtons();
    versusCard.style.opacity = 0;
    let id = null;
    let index = 0;
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
      if (index === 100) {
        clearInterval(id);
        animation.enableButtons();
      } else if (index < 50) {
        index++;
        // alter the logic to a effect close to previous with less code.
        playerCard.style.opacity = index / 50;
        playerCard.style.top = index - 50 + "px";
        computerCard.style.opacity = index / 50;
        computerCard.style.top = index - 50 + "px";
      } else if (index >= 50) {
        versusCard.style.opacity = index / 99;
        index++;
      }
    }
  },
  enableButtons() {
    paperbtn.disabled = false;
    rockbtn.disabled = false;
    scissorsbtn.disabled = false;
    lizardbtn.disabled = false;
    spockbtn.disabled = false;
  },
  disableButtons() {
    paperbtn.disabled = true;
    rockbtn.disabled = true;
    scissorsbtn.disabled = true;
    lizardbtn.disabled = true;
    spockbtn.disabled = true;
  },
};

// #### end of animation object ######


// -------- Handlers related to the score object ----------
const computerPoint = document.getElementById("computerscore"); //computer point DOM
const playerPoint = document.getElementById("playerscore");//player points DOM
const scoreOverTotalAbove = document.getElementById("healthpercabove"); //health percentage score DOM
const ratioHealth = document.getElementById("winrate"); //health bar ratio DOM
// -------- End of the Handlers related to the score object ----------



//####Score object ####
const score = {
  player: {
    score: 0,
    addPoints() {
      this.score++;
      document.getElementById("playerscore").innerText = this.score;
      score.scoreRatioCalc();
    },
  },
  computer: {
    score: 0,
    addPoints() {
      this.score++;
      document.getElementById("computerscore").innerText = this.score;
      score.scoreRatioCalc();
    },
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
    this.scoreRatio = Math.floor(
      (this.player.score / (this.player.score + this.computer.score)) * 100
    ); //calculates the score in % with floor.
    document.getElementById("healthpercabove").innerText =
      this.scoreRatio + "%"; //sets the % number
    ratioHealth.style.width = this.scoreRatio + "%"; //sets the health bar length

    if (this.scoreRatio > 95) {
      ratioHealth.style.borderRadius = "10px";
    } else if (this.scoreRatio < 5) {
      ratioHealth.style.width = "5%";
    } else {
      ratioHealth.style.borderRadius = "10px 0 0 10px";
    }
  },
  resetScore() {
    this.player.score = 0;
    this.computer.score = 0;
    this.scoreRatio = 0;
  }
};
//####### End of the score object #######

//########## model object #######

const model = {
  startRound(player, icon) {
    this.playerMoveIcon = icon;
    this.playerMove = player;
    this.setComputerMove();
  },
  playerMoveIcon: "",
  playerMove: "",
  computerMove: "",
  computerMoveIcon: "",
  roundWinner: "",
  setComputerMove() {
    let index = Math.floor(Math.random() * this.moveOptions.length);
    this.computerMoveIcon = this.moveOptions[index].scheme;
    this.computerMove = this.moveOptions[index].move;
    this.setWinner();
  },
  endRound() {
    winnerShow.innerHTML = this.roundWinner; //sets the winner variable to the round's winner
    playerMove.className = this.playerMoveIcon; //set the icon in the player move card
    computerMove.className = this.computerMoveIcon; //set the icon in the computer move card
    score.scoreCount(this.roundWinner); //triggers score counting function.
    animation.animateRound(); //triggers the card animation.
  },
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
      //if draw
    } else {
      if (this.playerMove === "rock") {
        if (
          this.computerMove === "lizard" ||
          this.computerMove === "scissors"
        ) {
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
    this.endRound();
  }, // end function
  resetGame() {
    this.playerMove = "";
    this.playerMoveIcon = "";
    this.computerMove = "";
    this.computerMoveIcon = "";
    this.roundWinner = "";
    computerPoint.innerText = 0;
    playerPoint.innerText = 0;
    scoreOverTotalAbove.innerText = 0 + "%"; //sets the % number
    ratioHealth.style.width = 50 + "%";
    winnerShow.innerHTML = "";
    score.resetScore();
    animation.animateRound();
    this.endRound();
  },
};

// end of model object #########

//----------Event Listeners related to the model object ---------


resetGame.addEventListener("click", function() {
  model.resetGame();
});
//Reset game event listener.

paperbtn.addEventListener("click", function () {
  model.startRound("paper", "fa-solid fa-hand");
});

rockbtn.addEventListener("click", function () {
  model.startRound("rock", "fa-solid fa-hand-back-fist");
});

scissorsbtn.addEventListener("click", function () {
  model.startRound("scissors", "fa-solid fa-hand-scissors");
});

lizardbtn.addEventListener("click", function () {
  model.startRound("lizard", "fa-solid fa-hand-lizard");
});

spockbtn.addEventListener("click", function () {
  model.startRound("spock", "fa-solid fa-hand-spock");
});

//----------End of the event listeners related to the model object -----------


