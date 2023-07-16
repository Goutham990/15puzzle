
let tiles;
let emptyIndex;
let moveCount = 0;
let startTime;
let timerInterval;
let isTimerRunning = false;

const puzzleBoard = document.querySelector('.puzzle-board');
const newGameBtn = document.querySelector('#new-game');
const moveCountElement = document.querySelector('#move-count');
const timerElement = document.querySelector('#timer');


newGameBtn.addEventListener('click', startNewGame);
puzzleBoard.addEventListener('click', handleTileClick);

startNewGame();

function startNewGame() {
  tiles = Array.from({ length: 16 }, (_, index) => index);
  emptyIndex = 0;
  moveCount = 0;
  moveCountElement.textContent = `Moves: 0`;
  resetTimer();
  moveCountElement.textContent = `Moves: ${moveCount}`;

}


function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
  isTimerRunning = true;
}

function stopTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
}

function resetTimer() {
  startTime = null;
  timerElement.textContent = '00:00';
  stopTimer();
}

function updateTimer() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  timerElement.textContent = `${padTime(minutes)}:${padTime(seconds)}`;
}

function padTime(time) {
  return time.toString().padStart(2, '0');
}

function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  updateTilePositions();
}

function updateTilePositions() {
  puzzleBoard.innerHTML = '';
  for (let i = 0; i < tiles.length; i++) {
    const tile = document.createElement('div');
    tile.classList.add('puzzle-tile');
    tile.textContent = tiles[i] === 0 ? '' : tiles[i];
    puzzleBoard.appendChild(tile);
  }
}

function handleTileClick(event) {
  const clickedIndex = Array.from(puzzleBoard.children).indexOf(event.target);
  const distance = Math.abs(emptyIndex - clickedIndex);
  if (distance === 1 || distance === 4) {
    swapTiles(emptyIndex, clickedIndex);
    emptyIndex = clickedIndex;
    moveCount++;
    moveCountElement.textContent = `Moves: ${moveCount}`;
    checkForWin();
  }
}

function swapTiles(index1, index2) {
  [tiles[index1], tiles[index2]] = [tiles[index2], tiles[index1]];
  updateTilePositions();
}

function checkForWin() {
  const isSorted = tiles.slice(1).every((tile, index) => tile === index + 1);
  if (isSorted) {
    setTimeout(() => {
      alert(`Congratulations! You solved the puzzle in ${moveCount} moves.`);
    }, 100);
  }
}
