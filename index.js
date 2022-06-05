var computer;
var player;
var playerMove = document.getElementById("player-move");
var computerMove = document.getElementById("computer-move");

function playerChoice (e) {
    console.log(e.target.value);
    console.log(e.target);
    playerMove.innerHTML = e.target.innerHTML;
}

const playerBtns = document.querySelectorAll('.button-wrapper button');
playerBtns.forEach(onebutton => onebutton.addEventListener('click', playerChoice));





