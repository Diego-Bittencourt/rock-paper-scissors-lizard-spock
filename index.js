var computer;
var player;
var playerMove = document.getElementById("player-move");
var computerMove = document.getElementById("computer-move");
// const scissors = "fa-solid fa-hand-scissors";
// const rock = "fa-solid fa-hand-back-fist";
// const paper = "fa-solid fa-hand";
// const lizard = "fa-solid fa-hand-lizard";
// const spock = "fa-solid fa-hand-spock";

const options = [scissors, rock, paper, lizard, spock];

function playermove(choice) {
    console.log("works");
    playerMove.className = choice;
    computerMove.className = options[Math.floor(Math.random() * options.length)];
}

// function playerChoice (e) {
//     console.log(e.target.value);
//     playerMove.className = e.target.value; 
//     computerMove.className = options[Math.floor(Math.random() * options.length)];
// }

// const playerBtns = document.querySelectorAll('.button-wrapper button');
// playerBtns.forEach(onebutton => onebutton.addEventListener('click', playerChoice));

const paperbtn = document.getElementById("paper");
paperbtn.addEventListener("click", playermove("fa-solid fa-hand"));

const rockbtn = document.getElementById('rock');
rockbtn.addEventListener('click', playermove("fa-solid fa-hand-back-fist"));





