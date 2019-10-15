var gPacman;
const PACMAN = '🙂';

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere

  if (nextCell === WALL) return;

  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    updateScore(1);
    gFoodCollected++;
    console.log('gFoodCollected: ', gFoodCollected);
    if (gFoodCollected === gFoodCount) {
      document.querySelector('.modal .msg').innerHTML =
        'victorious, you won!!!';
      document.querySelector('.reset').style.display = 'block';
    }
  }

  if (nextCell === SUPER_FOOD) {
    if (gPacman.isSuper) return;
    for (var i = 0; i < gGhosts.length; i++) {
      gGhosts[i].color = 'blue';
      renderCell(
        gGhosts[i].location,
        `<span style="color:blue">${GHOST}</span>`
      );
    }
    // gPacman.isSuper = true;
    renderCell(gPacman.location, EMPTY);
    SuperMod();
  }

  if (nextCell === GHOST) {
    if (!gPacman.isSuper) {
      gameOver();
      renderCell(gPacman.location, EMPTY);
      document.querySelector('.modal .msg').innerHTML = 'you lose, try again';
      document.querySelector('.reset').style.display = 'block';
      return;
    }
    for (var i = 0; i < gGhosts.length; i++) {
      if (
        gGhosts[i].location.i === nextLocation.i &&
        gGhosts[i].location.j === nextLocation.j
      ) {
        gGhosts.splice(i, 1);
      }
    }
    setTimeout(ghostsComeBack, 5000);
  }

  if (nextCell === CHERRY) {
    updateScore(10);
    renderCell(gPacman.location, EMPTY);
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);
}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default:
      return null;
  }

  return nextLocation;
}

function SuperMod() {
  gPacman.isSuper = true;
  moveGhosts();
  setTimeout(regularMod, 5000);
}

function regularMod() {
  gPacman.isSuper = false;
  //createGhosts(gBoard);
  moveGhosts();
}

function ghostsComeBack() {
  createGhosts(gBoard);
}
