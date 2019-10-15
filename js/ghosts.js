var GHOST = 'ᗣ';

// &#9781;
var gIntervalGhosts;
var gGhosts;

function createGhost(board) {
  var ghost = {
    color: [getRandomColor(), 'blue'],
    location: {
      i: 3,
      j: 3
    },
    currCellContent: FOOD
  };
  gGhosts.push(ghost);
  board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
  gGhosts = [];

  // empty the gGhosts array, create some ghosts
  createGhost(board);
  createGhost(board);
  createGhost(board);
  //  and run the interval to move them
  gIntervalGhosts = setInterval(moveGhosts, 2000);
}

function moveGhosts() {
  for (var i = 0; i < gGhosts.length; i++) {
    var ghost = gGhosts[i];

    // Create the moveDiff
    var moveDiff = getMoveDiff();
    var nextLocation = {
      i: ghost.location.i + moveDiff.i,
      j: ghost.location.j + moveDiff.j
    };
    // console.log('ghost.location', ghost.location, 'nextLocation', nextLocation, 'moveDiff', moveDiff)

    // if WALL return
    if (gBoard[nextLocation.i][nextLocation.j] === WALL) return;

    if (gBoard[nextLocation.i][nextLocation.j] === SUPER_FOOD) return;

    // if PACMAN - gameOver, return
    if (gBoard[nextLocation.i][nextLocation.j] === PACMAN) {
      renderCell(gPacman.location, EMPTY);
      document.querySelector('.modal .msg').innerHTML = 'you lose, try again';
      document.querySelector('.reset').style.display = 'block';
      gameOver();
      return;
    }
    // if GHOST - give up
    if (gBoard[nextLocation.i][nextLocation.j] === GHOST) {
      return;
    }

    // set back what we stepped on: update Model, DOM
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    renderCell(ghost.location, ghost.currCellContent);

    // move the ghost
    ghost.location = nextLocation;

    // keep the contnet of the cell we are going to
    ghost.currCellContent = gBoard[nextLocation.i][nextLocation.j];

    // move the ghost and update model and dom
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    renderCell(ghost.location, getGhostHTML(ghost));
  }
}
function getMoveDiff() {
  var randNum = getRandomIntInclusive(0, 100);
  if (randNum < 25) {
    return { i: 0, j: 1 };
  } else if (randNum < 50) {
    return { i: -1, j: 0 };
  } else if (randNum < 75) {
    return { i: 0, j: -1 };
  } else {
    return { i: 1, j: 0 };
  }
}

function getGhostHTML(ghost) {
  return `<span style = "color:${ghost.color}">${GHOST}</span>`;
}
