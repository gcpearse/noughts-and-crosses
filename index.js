const cells = [...document.getElementsByClassName("cell")];
const playAgainBtn = document.getElementById("play-again-btn");
let gameMessage = document.getElementById("game-message");
let playerTurn = 1;
let isGameActive = true;

const rowsOfThree = [
  ["a1", "a2", "a3"],
  ["b1", "b2", "b3"],
  ["c1", "c2", "c3"],
  ["a1", "b1", "c2"],
  ["a2", "b2", "c2"],
  ["a3", "b3", "c3"],
  ["a1", "b2", "c3"],
  ["a3", "b2", "c1"]
];

let playerOneCells = [];
let playerTwoCells = [];

const declareWinner = () => {
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

const declareDraw = () => {
  return playerOneCells.length + playerTwoCells.length === 9 && !declareWinner();
};

const resetGame = () => {
  gameMessage.innerText = "Player one's turn";
  cells.forEach((cell) => cell.innerText = "");
  playerOneCells = [];
  playerTwoCells = [];
  isGameActive = true;
  playAgainBtn.innerText = "Reset game";
};

cells.forEach((cell) => {
  cell.addEventListener("click", fillCell = (event) => {
    if (playerTurn === 1 && !cell.innerText && isGameActive) {
      cell.innerText = "O";
      playerOneCells.push(event.target.id);
      playerTurn = 2;
      gameMessage.innerText = "Player two's turn";
      if (declareWinner() || declareDraw()) {
        isGameActive = false;
        playAgainBtn.innerText = "Play again?";
        if (declareWinner()) gameMessage.innerText = "Player one wins!";
        if (declareDraw()) gameMessage.innerText = "Draw!";
      }
    } else if (playerTurn === 2 && !cell.innerText && isGameActive) {
      cell.innerText = "X";
      playerTwoCells.push(event.target.id);
      playerTurn = 1;
      gameMessage.innerText = "Player one's turn";
      if (declareWinner() || declareDraw()) {
        isGameActive = false;
        playAgainBtn.innerText = "Play again?";
        if (declareWinner()) gameMessage.innerText = "Player two wins!";
        if (declareDraw()) gameMessage.innerText = "Draw!";
      }
    }
  });
});

playAgainBtn.addEventListener("click", resetGame);
