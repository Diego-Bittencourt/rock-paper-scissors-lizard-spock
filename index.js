var computer;
var player;
var playerMove = document.getElementById("player-move");
var computerMove = document.getElementById("computer-move");
// const scissors = "fa-solid fa-hand-scissors";
// const rock = "fa-solid fa-hand-back-fist";
// const paper = "fa-solid fa-hand";
// const lizard = "fa-solid fa-hand-lizard";
// const spock = "fa-solid fa-hand-spock";
// const options = [scissors, rock, paper, lizard, spock];

const options = [
    {
        move: "scissors",
        scheme: "fa-solid fa-hand-scissors"
    },
    {
        move: "rock",
        scheme: "fa-solid fa-hand-back-fist"
    },
    {
        move: "paper",
        scheme: "fa-solid fa-hand"
    },
    {
        move: "lizard",
        scheme: "fa-solid fa-hand-lizard"
    },
    {
        move: "spock",
        scheme: "fa-solid fa-hand-spock"
    }

]


function playermove(choice, move) {
    player = move;
    playerMove.className = choice;
    let index =  Math.floor(Math.random() * options.length);
    computerMove.className = options[index].scheme;
    computer = options[index].move;
    console.log(computer);
    // computermove();
    
};

// function computermove() {
//     let index =  Math.floor(Math.random() * options.length);
//     computerMove.className = options[index].scheme;
//     computer = options[index][move];
//     console.groupCollapsed(computer);
// };

//the addEventListener should have a function pointer of a function returnin another function.
//writing like addEventListener('click', oneFunction(argument)) will trigger the function right away.

const paperbtn = document.getElementById("paper");
paperbtn.addEventListener('click', function () { playermove("fa-solid fa-hand", "paper") });

const rockbtn = document.getElementById('rock');
rockbtn.addEventListener('click', function () { playermove("fa-solid fa-hand-back-fist", "rock") });

const scissorsbtn = document.getElementById('scissors');
scissorsbtn.addEventListener('click', function () { playermove("fa-solid fa-hand-scissors", "scissors")})

const lizardbtn = document.getElementById('lizard');
lizardbtn.addEventListener('click', function () { playermove("fa-solid fa-hand-lizard", "lizard")});

const spockbtn = document.getElementById('spock');
spockbtn.addEventListener('click', function () { playermove("fa-solid fa-hand-spock", "spock")});



// ######## NOT WORKING CODE #############
// function playerChoice (e) {
//     console.log("works");
//     playerMove.className = e.target.value; 
//     computerMove.className = options[Math.floor(Math.random() * options.length)];
// }

// const playerBtns = document.querySelectorAll('.button-wrapper button');
// playerBtns.forEach.onClick = playerChoice;
