'use strict';
var WALL = '🌴';
var FOOD = '.';
var SUPER_FOOD = '🍌';
var EMPTY = ' ';
var CHERRY = '🍒';

var gFoodCollected;
var gFoodCount;
var gIntervalCherry;

var gBoard;
var gGame = {
  score: 0,
  isOn: false
};

function init() {
  gFoodCollected = 0;
  gFoodCount = -2;
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;
  //display:none; the modal
  document.querySelector('.modal .msg').innerHTML = '';
  document.querySelector('.reset').style.display = 'none';
  gIntervalCherry = setInterval(creatCherry, 5000);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      if (
        (i === 1 && j === 1) ||
        (i === 1 && j === SIZE - 2) ||
        (i === SIZE - 2 && j === 1) ||
        (i === SIZE - 2 && j === SIZE - 2)
      )
        board[i][j] = SUPER_FOOD;
      else {
        board[i][j] = FOOD;
        gFoodCount++;
        console.log('gFoodCount: ', gFoodCount);
      }
      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL;
        gFoodCount--;
      }
    }
  }
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}

function gameOver() {
  console.log('Game Over');
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
}

function creatCherry() {
  var emptyCells = findEmptyCells(gBoard, EMPTY);
  if (emptyCells.length === 0) return;
  var emptyIdx = getRandomIntInclusive(1, emptyCells.length);
  var cherryIdx = emptyCells[emptyIdx];
  gBoard[cherryIdx.i][cherryIdx.j] = CHERRY;
  renderCell(cherryIdx, CHERRY);
}

function findEmptyCells(mat, char) {
  var emptyCells = [];
  for (var i = 0; i < mat.length; i++) {
    for (var j = 0; j < mat[0].length; j++) {
      if (mat[i][j] === char) emptyCells.push({ i: i, j: j });
    }
  }
  return emptyCells;
}
