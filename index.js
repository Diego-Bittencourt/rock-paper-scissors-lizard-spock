var computer;
var player;
var playerMove = document.getElementById("player-move");
var computerMove = document.getElementById("computer-move");
const scissors = "fa-solid fa-hand-scissors";
const rock = "fa-solid fa-hand-back-fist";
const paper = "fa-solid fa-hand";
const lizard = "fa-solid fa-hand-lizard";
const spock = "fa-solid fa-hand-spock";
const options = [scissors, rock, paper, lizard, spock];


function playermove(choice) {
    console.log(choice);
    playerMove.className = choice;
    computerMove.className = options[Math.floor(Math.random() * options.length)];
}

//the addEventListener should have a function pointer of a function returnin another function.
//writing like addEventListener('click', oneFunction(argument)) will trigger the function right away.

const paperbtn = document.getElementById("paper");
paperbtn.addEventListener('click', function () { playermove("fa-solid fa-hand") });

const rockbtn = document.getElementById('rock');
rockbtn.addEventListener('click', function () { playermove("fa-solid fa-hand-back-fist") });

const scissorsbtn = document.getElementById('scissors');
scissorsbtn.addEventListener('click', function () { playermove("fa-solid fa-hand-scissors")})

const lizardbtn = document.getElementById('lizard');
lizardbtn.addEventListener('click', function () { playermove("fa-solid fa-hand-lizard")});

const spockbtn = document.getElementById('spock');
spockbtn.addEventListener('click', function () { playermove("fa-solid fa-hand-spock")});



// ######## NOT WORKING CODE #############
// function playerChoice (e) {
//     console.log("works");
//     playerMove.className = e.target.value; 
//     computerMove.className = options[Math.floor(Math.random() * options.length)];
// }

// const playerBtns = document.querySelectorAll('.button-wrapper button');
// playerBtns.forEach.onClick = playerChoice;
