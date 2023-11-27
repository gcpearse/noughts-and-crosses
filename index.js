const cells = [...document.getElementsByClassName("cell")];

let gameMessage = document.getElementById("game-message");

const resetGameBtn = document.getElementById("reset-game-btn");
const resetScoreBtn = document.getElementById("reset-score-btn");

let playerOneScore = document.getElementById("p1-score");
let playerTwoScore = document.getElementById("p2-score");
playerOneScore.innerText = localStorage.getItem("p1-count") || 0;
playerTwoScore.innerText = localStorage.getItem("p2-count") || 0;

let playerTurn = Math.ceil(Math.random() * 2);
if (playerTurn === 1) gameMessage.innerText = "Player one's turn";
if (playerTurn === 2) gameMessage.innerText = "Player two's turn";

let isGameActive = true;

const rowsOfThree = [
  ["a1", "a2", "a3"],
  ["b1", "b2", "b3"],
  ["c1", "c2", "c3"],
  ["a1", "b1", "c1"],
  ["a2", "b2", "c2"],
  ["a3", "b3", "c3"],
  ["a1", "b2", "c3"],
  ["a3", "b2", "c1"]
];

let playerOneCells = [];
let playerTwoCells = [];

const detectWinner = () => {
  for (let row of rowsOfThree) {
    let playerOneCount = 0;
    let playerTwoCount = 0;
    for (let cell of row) {
      if (playerOneCells.includes(cell)) playerOneCount++;
      if (playerTwoCells.includes(cell)) playerTwoCount++;
    }
    if (playerOneCount === 3 || playerTwoCount === 3) return true;
  }
  return false;
};

const detectDraw = () => {
  return playerOneCells.length + playerTwoCells.length === 9 && !detectWinner();
};

const resetGame = () => {
  if (playerTurn === 1) gameMessage.innerText = "Player one's turn";
  if (playerTurn === 2) gameMessage.innerText = "Player two's turn";
  cells.forEach((cell) => cell.innerText = "");
  playerOneCells = [];
  playerTwoCells = [];
  isGameActive = true;
  resetGameBtn.innerText = "Reset game";
};

const setLocalStorage = () => {
  localStorage.setItem("p1-count", playerOneScore.innerText);
  localStorage.setItem("p2-count", playerTwoScore.innerText);
};

const resetScore = () => {
  playerOneScore.innerText = 0;
  playerTwoScore.innerText = 0;
  localStorage.clear();
};

cells.forEach((cell) => {
  cell.addEventListener("click", fillCell = (event) => {
    if (playerTurn === 1 && !cell.innerText && isGameActive) {
      cell.innerText = "O";
      playerOneCells.push(event.target.id);
      playerTurn = 2;
      gameMessage.innerText = "Player two's turn";
      if (detectWinner() || detectDraw()) {
        isGameActive = false;
        resetGameBtn.innerText = "Play again?";
        if (detectWinner()) {
          gameMessage.innerText = "Player one wins!";
          playerOneScore.innerText++;
        }
        if (detectDraw()) gameMessage.innerText = "Draw!";
        setLocalStorage();
      }
    } else if (playerTurn === 2 && !cell.innerText && isGameActive) {
      cell.innerText = "X";
      playerTwoCells.push(event.target.id);
      playerTurn = 1;
      gameMessage.innerText = "Player one's turn";
      if (detectWinner() || detectDraw()) {
        isGameActive = false;
        resetGameBtn.innerText = "Play again?";
        if (detectWinner()) {
          gameMessage.innerText = "Player two wins!";
          playerTwoScore.innerText++;
        }
        if (detectDraw()) gameMessage.innerText = "Draw!";
        setLocalStorage();
      }
    }
  });
});

resetGameBtn.addEventListener("click", resetGame);
resetScoreBtn.addEventListener("click", resetScore);
