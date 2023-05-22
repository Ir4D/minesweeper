const body = document.querySelector('body');
const header = document.createElement('header');
const h1 = document.createElement('h1');
const main = document.createElement('main');
const container = document.createElement('div');
const menu = document.createElement('div');
const menuWrapper = document.createElement('div');
const newGame = document.createElement('div');
const mode = document.createElement('div');
const difficulty = document.createElement('div');
const easy = document.createElement('div');
const medium = document.createElement('div');
const hard = document.createElement('div');
const minesQuantity = document.createElement('div');
const minesQuantitySlider = document.createElement('input');
const game = document.createElement('div');
const gameInfo = document.createElement('div');
const infoClicks = document.createElement('div');
const clicksIcon = document.createElement('div');
const clicksNumber = document.createElement('div');
const infoTimer = document.createElement('div');
const timerIcon = document.createElement('div');
const timerNumber = document.createElement('div');
const infoFlags = document.createElement('div');
const flagsIcon = document.createElement('div');
const flagsNumber = document.createElement('div');
const gameFieldContainer = document.createElement('div');
const gameField = document.createElement('div');
const gameModal = document.createElement('div');
const score = document.createElement('div');
const scoreModal = document.createElement('div');
const soundBtn = document.createElement('div');

body.className = 'body';
header.className = 'header';
h1.className = 'game-title';
main.className = 'main';
container.className = 'container';
menu.className = 'menu';
newGame.className = 'new-game';
score.className = 'score';
scoreModal.className = 'score-modal';
menuWrapper.className = 'menu__wrapper';
mode.className = 'mode';
difficulty.className = 'difficulty';
easy.className = 'difficulty__easy';
medium.className = 'difficulty__medium';
hard.className = 'difficulty__hard';
minesQuantity.className = 'mines-quantity';
minesQuantitySlider.className = 'mines-quantity__slider';
game.className = 'game';
gameInfo.className = 'game__info';
infoClicks.className = 'info__clicks';
clicksIcon.className = 'clicks__icon';
clicksNumber.className = 'clicks__number';
infoTimer.className = 'info__timer';
timerIcon.className = 'timer__icon';
timerNumber.className = 'timer__number';
infoFlags.className = 'info__flags';
flagsIcon.className = 'flags__icon';
flagsNumber.className = 'flags__number';
gameFieldContainer.className = 'game__field-container';
gameField.className = 'game__field';
gameModal.className = 'game-modal';
soundBtn.className = 'sound-btn';

body.appendChild(header);
header.appendChild(h1);
body.appendChild(main);
main.appendChild(container);
container.appendChild(menu);
menu.appendChild(menuWrapper);
menuWrapper.appendChild(newGame);
menuWrapper.appendChild(score);
menuWrapper.appendChild(soundBtn);
menuWrapper.appendChild(mode);
menu.appendChild(difficulty);
difficulty.appendChild(easy);
difficulty.appendChild(medium);
difficulty.appendChild(hard);
menu.appendChild(minesQuantity);
minesQuantity.appendChild(minesQuantitySlider);
container.appendChild(scoreModal);
container.appendChild(gameModal);
container.appendChild(game);
game.appendChild(gameInfo);
gameInfo.classList.add('info');
gameInfo.appendChild(infoClicks);
infoClicks.classList.add('clicks');
infoClicks.appendChild(clicksIcon);
clicksIcon.classList.add('icon');
infoClicks.appendChild(clicksNumber);
gameInfo.appendChild(infoTimer);
infoTimer.classList.add('timer');
infoTimer.appendChild(timerIcon);
timerIcon.classList.add('icon');
infoTimer.appendChild(timerNumber);
gameInfo.appendChild(infoFlags);
infoFlags.classList.add('flags');
infoFlags.appendChild(flagsIcon);
flagsIcon.classList.add('icon');
infoFlags.appendChild(flagsNumber);
game.appendChild(gameFieldContainer);
gameFieldContainer.appendChild(gameField);
gameField.classList.add('field');
easy.classList.add('active');

h1.innerHTML = 'Minesweeper';
newGame.innerHTML = 'New game';
score.innerHTML = 'Score';
easy.innerHTML = 'Easy';
medium.innerHTML = 'Medium';
hard.innerHTML = 'Hard';
minesQuantitySlider.type = 'range';
minesQuantitySlider.min = '10';
minesQuantitySlider.max = '99';
minesQuantitySlider.value = '10';

let size = localStorage.getItem('size') || 10;
let minesAmount = localStorage.getItem('minesAmount') || 10;
let field = Math.pow(size, 2);
let mines = localStorage.getItem('mines') ? JSON.parse(localStorage.getItem('mines')) : [];
let dangerNumbers = localStorage.getItem('dangerNumbers') ? JSON.parse(localStorage.getItem('dangerNumbers')) : [];
let x = 0;
let y = 0;
let openedCells = localStorage.getItem('openedCells') ? JSON.parse(localStorage.getItem('openedCells')) : [];
let dangerMap = localStorage.getItem('myMap') ? new Map(JSON.parse(localStorage.myMap)) : new Map();
let clicksCount = localStorage.getItem('clicksCount') || 0;
let flagsAmount = minesAmount;
let flaggedCells = localStorage.getItem('flaggedCellsLS') ? new Set(JSON.parse(localStorage.getItem('flaggedCellsLS'))) : new Set();
let timeCount;
let firstClick = localStorage.getItem('firstClick') || undefined;
let firstMove = localStorage.getItem('firstMove') || 'true';
let second = localStorage.getItem('second') || 0;
let minute = localStorage.getItem('minute') || 0;
let hour = localStorage.getItem('hour') || 0;
let gameEnd = false;
let lastTenResults = localStorage.getItem('lastTenResults') ? JSON.parse(localStorage.getItem('lastTenResults')) : [];
let fieldDifficulty = localStorage.getItem('fieldDifficulty') || 'easy';
let modeLoad = localStorage.getItem('modeLoad') || 'dark';
let isMuted = localStorage.getItem('isMuted') || 'false';
let timeLoad = [hour, minute, second].map(function (element) {
  if (element < 10) {
    return '0' + element;
  } else {
    return element;
  }
})
timerNumber.innerHTML = timeLoad.join(':');
clicksNumber.innerHTML = clicksCount;
flagsNumber.innerHTML = flagsAmount  - flaggedCells.size;

/* ************************ */
/* TIMER */
/* ************************ */

function timer() {
  second++;
  if (second === 60) {
    minute++;
    second = 0;
  }
  if (minute === 60) {
    hour++;
    minute = 0;
  }
  const time = [hour, minute, second].map(function (element) {
    if (element < 10) {
      return '0' + element;
    } else {
      return element;
    }
  })
  timerNumber.innerHTML = time.join(':');
}

let countTime = setInterval(timer, 1000);


/* ************************ */
/* MINES AMOUNT */
/* ************************ */

minesQuantitySlider.oninput = function() {
  startNewGame();
}


/* ************************ */
/* GAME FIELD */
/* ************************ */

function initField() {
  for (let i = 0; i < field; i += 1) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    gameField.appendChild(cell);
  }

  let cells = document.querySelectorAll('.cell');
  let x = 0;
  let y = 0;

  cells.forEach((elem) => {
    elem.setAttribute('cell-coords', `${x},${y}`);
    x++;
    if (x >= size) {
      x = 0;
      y++;
    }
  });

  clearInterval(countTime);
  countTime = setInterval(timer, 1000);
}
initField();


/* ************************ */
/* SET MINES */
/* ************************ */

function setMines(firstClick) {
  cells = document.querySelectorAll('.cell');

  if (firstClick) {
    cells.forEach(cell => {
      cell.className = 'cell';
      cell.removeAttribute('cell-number');
    });
    mines = [];
    dangerNumbers = [];
  }

  function getRandomSet(min, max, n) {
    let res = new Set();
    while (res.size < n) {
      let x = Math.floor(Math.random() * (max - min + 1)) + min;
      let y = Math.floor(Math.random() * (max - min + 1)) + min;
      let random = String(x) + ',' + String(y);
      res.add(random);
    }
    return res;
  }

  let mySet = getRandomSet(0, size - 1, minesAmount);

  for (const item of mySet) {
    mines.push(item);
  }
  
  if (mines.includes(firstClick)) {
    setMines(firstClick);
  }

  mines.forEach(mine => {
    let coords = mine.split(',');
      let minedCell = document.querySelectorAll(`[cell-coords="${parseInt(coords[0])},${parseInt(coords[1])}"]`)[0];
      minedCell.classList.add('mined');
    }
  )
}


/* ************************ */
/* DANGEROUS CELLS */
/* ************************ */

function setDangerousCells(firstClick) {
  setMines(firstClick);

  function setDangerNumbers() {
    mines.forEach(item => {
      let x = Number(item.split(',')[0]);
      let y = Number(item.split(',')[1]);
      if (x > 0) {
        dangerNumbers.push(`${x-1},${y}`);
        if (y < (size - 1)) {
          dangerNumbers.push(`${x-1},${y+1}`);
        }
      }
      if (x < size - 1) {
        dangerNumbers.push(`${x+1},${y}`);
      }
      if (y > 0) {
        dangerNumbers.push(`${x},${y-1}`);
        if (x < (size - 1)) {
          dangerNumbers.push(`${x+1},${y-1}`);
        }
      }
      if (y < size - 1) {
        dangerNumbers.push(`${x},${y+1}`);
      }
      if (x > 0 && y > 0) {
        dangerNumbers.push(`${x-1},${y-1}`);
      }
      if (x < (size - 1) && y < (size - 1)) {
        dangerNumbers.push(`${x+1},${y+1}`);
      }
    });
  }
  setDangerNumbers();

  dangerNumbers.forEach(number => {
    let c = Number(number.split(',')[0]);
    let d = Number(number.split(',')[1]);
    let dangerCell = document.querySelectorAll(`[cell-coords="${c},${d}"]`)[0];
    let numberOfMines = parseInt(dangerCell.getAttribute('cell-number'));
    if (!numberOfMines) {
      numberOfMines = 0;
    }
    numberOfMines = numberOfMines + 1;
    dangerCell.setAttribute('cell-number', numberOfMines);
    dangerCell.classList.add('danger');
    dangerCell.classList.add(`danger-${numberOfMines}`);
    dangerMap.set(number, numberOfMines);
  });
};


/* ************************ */
/* MODAL WINDOW */
/* ************************ */

function setModalWindow(text) {
  let modalWindow = document.createElement('div');
  modalWindow.classList.add('modal');
  let modalCloseBtn = document.createElement('span');
  modalCloseBtn.classList.add('close');
  modalWindow.appendChild(modalCloseBtn);
  let modalText = document.createElement('div');
  modalText.classList.add('modal-text');
  modalWindow.appendChild(modalText);
  modalText.innerHTML = text;
  gameModal.appendChild(modalWindow);
}

function addClicks() {
  clicksNumber.innerHTML = clicksCount;
}


/* ************************ */
/* CLICK ACTIONS */
/* ************************ */

function handleClick(e) {
  let cells = document.querySelectorAll('.cell');

  if (firstMove === 'true') {
    firstClick = e.target.attributes['cell-coords'].value;
    setDangerousCells(firstClick);
  }
  let cellValue = e.target.attributes['cell-coords'].value;
  
  if (e.target.classList.contains('flag')) {
    return;
  }

  if (!e.target.classList.contains('opened')) {
    clicksCount++;
    addClicks();
  }

  playSound('../assets/audio/click.wav');
  e.target.classList.add('opened');
  firstMove = 'false';

  if (dangerMap.has(cellValue)) {
    e.target.innerHTML = dangerMap.get(cellValue);
  }
  openedCells.push(cellValue);

  if (e.target.classList.contains('cell')) {
    let openedCellCoords = e.target.attributes['cell-coords'].value;
    let targetCellX = Number(openedCellCoords.split(',')[0]);
    let targetCellY = Number(openedCellCoords.split(',')[1]);

    function checkFlag(cell) {
      if (cell.classList.contains('flag')) {
        if (openedCells.includes(cell.attributes['cell-coords'].value)) {
          cell.classList.toggle('flag');
          flaggedCells.delete(cell.attributes['cell-coords'].value);
          updateFlagsAmount();
        }
      } 
    }

    function setOpenClass(cell) {
      if (openedCells.includes(cell.attributes['cell-coords'].value)) {
        cell.classList.add('opened');
      }
    }
    
    function findEmptyCells(targetCellX, targetCellY) {
      cells.forEach(cell => {
        let x = Number(cell.attributes['cell-coords'].value.split(',')[0]);
        let y = Number(cell.attributes['cell-coords'].value.split(',')[1]);

        if (x === targetCellX + 1 && y === targetCellY) {
          if (!mines.includes(`${x},${y}`) && !dangerNumbers.includes(`${x},${y}`) && !openedCells.includes(`${x},${y}`)) {
            openedCells.push(`${x},${y}`);
            findEmptyCells(x, y);
          } else if (dangerNumbers.includes(`${x},${y}`)) {
            openedCells.push(`${x},${y}`);
            cell.innerHTML = dangerMap.get(`${x},${y}`);
          }
        }

        if (x === targetCellX + 1 && y === targetCellY + 1) {
          if (!mines.includes(`${x},${y}`) && !dangerNumbers.includes(`${x},${y}`) && !openedCells.includes(`${x},${y}`)) {
            openedCells.push(`${x},${y}`);
            findEmptyCells(x, y);
          } else if (dangerNumbers.includes(`${x},${y}`)) {
            openedCells.push(`${x},${y}`);
            cell.innerHTML = dangerMap.get(`${x},${y}`);
          }
        }

        if (x === targetCellX && y === targetCellY + 1) {
          if (!mines.includes(`${x},${y}`) && !dangerNumbers.includes(`${x},${y}`) && !openedCells.includes(`${x},${y}`)) {
            openedCells.push(`${x},${y}`);
            findEmptyCells(x, y);
          } else if (dangerNumbers.includes(`${x},${y}`)) {
            openedCells.push(`${x},${y}`);
            cell.innerHTML = dangerMap.get(`${x},${y}`);
          }
        }

        if (x === targetCellX - 1 && y === targetCellY + 1) {
          if (!mines.includes(`${x},${y}`) && !dangerNumbers.includes(`${x},${y}`) && !openedCells.includes(`${x},${y}`)) {
            openedCells.push(`${x},${y}`);
            findEmptyCells(x, y);
          } else if (dangerNumbers.includes(`${x},${y}`)) {
            openedCells.push(`${x},${y}`);
            cell.innerHTML = dangerMap.get(`${x},${y}`);
          }
        }

        if (x === targetCellX - 1 && y === targetCellY) {
          if (!mines.includes(`${x},${y}`) && !dangerNumbers.includes(`${x},${y}`) && !openedCells.includes(`${x},${y}`)) {
            openedCells.push(`${x},${y}`);
            findEmptyCells(x, y);
          } else if (dangerNumbers.includes(`${x},${y}`)) {
            openedCells.push(`${x},${y}`);
            cell.innerHTML = dangerMap.get(`${x},${y}`);
          }
        }

        if (x === targetCellX - 1 && y === targetCellY - 1) {
          if (!mines.includes(`${x},${y}`) && !dangerNumbers.includes(`${x},${y}`) && !openedCells.includes(`${x},${y}`)) {
            openedCells.push(`${x},${y}`);
            findEmptyCells(x, y);
          } else if (dangerNumbers.includes(`${x},${y}`)) {
            openedCells.push(`${x},${y}`);
            cell.innerHTML = dangerMap.get(`${x},${y}`);
          }
        }

        if (x === targetCellX && y === targetCellY - 1) {
          if (!mines.includes(`${x},${y}`) && !dangerNumbers.includes(`${x},${y}`) && !openedCells.includes(`${x},${y}`)) {
            openedCells.push(`${x},${y}`);
            findEmptyCells(x, y);
          } else if (dangerNumbers.includes(`${x},${y}`)) {
            openedCells.push(`${x},${y}`);
            cell.innerHTML = dangerMap.get(`${x},${y}`);
          }
        }

        if (x === targetCellX + 1 && y === targetCellY - 1) {
          if (!mines.includes(`${x},${y}`) && !dangerNumbers.includes(`${x},${y}`) && !openedCells.includes(`${x},${y}`)) {
            openedCells.push(`${x},${y}`);
            findEmptyCells(x, y);
          } else if (dangerNumbers.includes(`${x},${y}`)) {
            openedCells.push(`${x},${y}`);
            cell.innerHTML = dangerMap.get(`${x},${y}`);
          }
        }
      });

      cells.forEach(cell => {
        checkFlag(cell);
        setOpenClass(cell);
      });
    }

    if (!mines.includes(openedCellCoords) && !dangerNumbers.includes(openedCellCoords)) {
      findEmptyCells(targetCellX, targetCellY);
    } else if (mines.includes(openedCellCoords)) {
      clearInterval(countTime);
      let gameResultText = `Game over. <br>Try again`;
      gameModal.innerHTML = '';
      setModalWindow(gameResultText);
      const modal = document.querySelector('.modal')
      const closeBtn = document.querySelector('.close')
      modal.style.display = 'block';
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      })
      playSound('../assets/audio/lose.wav');
      gameEnd = true;
      stopGame();
    }

    cells.forEach(cell => {
      if (cell.classList.contains('opened')) {
        flaggedCells.delete(cell.attributes['cell-coords'].value);
        updateFlagsAmount();
      }
    });
  }
}
gameField.addEventListener('click', handleClick);


/* ************************ */
/* STOP GAME */
/* ************************ */

function stopGame() {
  if (gameEnd) {
    gameField.removeEventListener('click', handleClick);
    gameField.removeEventListener('contextmenu', setFlag);
    gameField.removeEventListener('click', setWin);
  }

  clearInterval(timeCount);
}


/* ************************ */
/* FLAGS */
/* ************************ */

let cells = document.querySelectorAll('.cell');

function setFlag(e) {
  e.preventDefault();

  if (firstMove === 'true') {
    firstClick = e.target.attributes['cell-coords'].value;
    setDangerousCells(firstClick);
  }
  firstMove = 'false';

  if (!e.target.classList.contains('opened')) {
    e.target.classList.toggle('flag');
    playSound('../assets/audio/flag.wav');

    if (e.target.classList.contains('flag')) {
      flaggedCells.add(e.target.attributes['cell-coords'].value);
      updateFlagsAmount();
    } else {
      flaggedCells.delete(e.target.attributes['cell-coords'].value);
      updateFlagsAmount();
    }

    setWin();
  }
}
gameField.addEventListener('contextmenu', setFlag);

function updateFlagsAmount() {
  flagsNumber.innerHTML = flagsAmount - flaggedCells.size;
  cells = document.querySelectorAll('.cell');

  cells.forEach(cell => {
    if (flaggedCells.has(cell.attributes['cell-coords'].value)) {
      cell.classList.add('flag');
    } else {
      cell.classList.remove('flag');
    }
  });
}


/* ************************ */
/* WIN GAME */
/* ************************ */

function isWinGameFlags(mines, flaggedCells) {
  if (mines.length > 0) { 
    let a = mines.sort((a, b) => a.localeCompare(b));
    let b = Array.from(flaggedCells).sort((a, b) => a.localeCompare(b));
  
    const isEqual = (a, b) => {
      if (a.length === b.length && a.every((value, index) => value === b[index])) {
        return true;
      }
      else {
        return false;
      }
    }
  
    let equal = isEqual(a, b);
    return equal;
  }
};

let closedCells;

function isWinGameNoFlags() {
  if (mines.length > 0) {
    closedCells = [];
    cells = document.querySelectorAll('.cell');
  
    cells.forEach(cell => {
      if (!openedCells.includes(cell.attributes['cell-coords'].value)) {
        closedCells.push(cell.attributes['cell-coords'].value);
      }
    });
  
    let a = mines.sort((a, b) => a.localeCompare(b));
    let b = closedCells.sort((a, b) => a.localeCompare(b));
  
    const isEqual = (a, b) => {
      if (a.length === b.length && a.every((value, index) => value === b[index])) {
        return true;
      }
      else {
        return false;
      }
    }
  
    let equal = isEqual(a, b);
    return equal;
  }
}

function setWin(e) {
  if (isWinGameFlags(mines, flaggedCells) || isWinGameNoFlags()) {
    setLastResults(timerNumber.innerText, minesAmount, clicksNumber.innerText)
    clearInterval(countTime);
    let gameResultText = `Hooray! <br>You found all mines <br>in ${timerNumber.innerText} seconds <br>and ${clicksNumber.innerText} moves!`;
    gameModal.innerHTML = '';
    setModalWindow(gameResultText);
    const modal = document.querySelector('.modal')
    const closeBtn = document.querySelector('.close')
    modal.style.display = 'block';

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    playSound('../assets/audio/win.wav');
    gameEnd = true;
    stopGame();
  }
}
gameField.addEventListener('click', setWin);


/* ************************ */
/* START NEW GAME */
/* ************************ */

function startNewGame() {
  minesAmount = minesQuantitySlider.value;
  firstClick = true;
  firstMove = 'true';
  second = 0;
  minute = 0;
  hour = 0;
  timerNumber.innerHTML = '00:00:00';
  flagsAmount = minesAmount;
  flagsNumber.innerHTML = flagsAmount;
  clicksCount = 0;
  clicksNumber.innerHTML = clicksCount;
  x = 0;
  y = 0;
  gameEnd = false;
  mines = [];
  dangerNumbers = [];
  openedCells = [];
  dangerMap.clear();
  flaggedCells.clear();
  gameField.innerHTML = '';
  initField();
  gameField.addEventListener('click', handleClick);
  gameField.addEventListener('contextmenu', setFlag);
  gameField.addEventListener('click', setWin);
}
newGame.addEventListener('click', startNewGame);


/* ************************ */
/* SOUND EFFECTS */
/* ************************ */

let sound = new Audio();

function playSound(src) {
  if (isMuted === 'false') {
    sound = new Audio(src);
    sound.volume = 0.5;
    sound.play();
    sound.muted = false;
  } else if (isMuted === 'true') {
    sound.muted = true;
  }
}

function setSoundMode(e) {
  if (!e.target.classList.contains('muted')) {
    e.target.classList.add('muted');
    isMuted = 'true';
  } else {
    e.target.classList.remove('muted');
    isMuted = 'false';
  }
}
soundBtn.addEventListener('click', setSoundMode);


/* ************************ */
/* GAME DIFFICULTY */
/* ************************ */

function setEasyDifficulty(e) {
  if (!e.target.classList.contains('active')) {
    fieldDifficulty = 'easy';
    e.target.classList.add('active');
    medium.classList.remove('active');
    hard.classList.remove('active');
    size = 10;
    field = Math.pow(size, 2);
    container.style.width = '330px';
    gameFieldContainer.style.width = '183px';
    gameFieldContainer.style.margin = '0 auto';
    gameField.style.gridTemplateColumns = 'repeat(10, 1fr)'
    startNewGame();
  }
}
easy.addEventListener('click', setEasyDifficulty);

function setMediumDifficulty(e) {
  if (!e.target.classList.contains('active')) {
    fieldDifficulty = 'medium';
    e.target.classList.add('active');
    easy.classList.remove('active');
    hard.classList.remove('active');
    size = 15;
    field = Math.pow(size, 2);
    container.style.width = '330px';
    gameFieldContainer.style.width = '274px';
    gameFieldContainer.style.margin = '0 auto';
    gameField.style.gridTemplateColumns = 'repeat(15, 1fr)'
    startNewGame();
  }
}
medium.addEventListener('click', setMediumDifficulty);

function setHardDifficulty(e) {
  if (!e.target.classList.contains('active')) {
    fieldDifficulty = 'hard';
    e.target.classList.add('active');
    easy.classList.remove('active');
    medium.classList.remove('active');
    size = 25;
    field = Math.pow(size, 2);
    container.style.width = '460px';
    gameFieldContainer.style.width = '453px';
    gameFieldContainer.style.marginLeft = '-16px';
    gameField.style.gridTemplateColumns = 'repeat(25, 1fr)'
    startNewGame();
  }
}
hard.addEventListener('click', setHardDifficulty);


/* ************************ */
/* LIGHT MODE */
/* ************************ */

function changeMode() {
  body.classList.toggle('light-mode');
  header.classList.toggle('light-mode');
  h1.classList.toggle('light-mode');
  container.classList.toggle('light-mode');
  menu.classList.toggle('light-mode');
  newGame.classList.toggle('light-mode');
  mode.classList.toggle('light-mode');
  easy.classList.toggle('light-mode');
  medium.classList.toggle('light-mode');
  hard.classList.toggle('light-mode');
  minesQuantitySlider.classList.toggle('light-mode');
  infoClicks.classList.toggle('light-mode');
  infoTimer.classList.toggle('light-mode');
  infoFlags.classList.toggle('light-mode');
  gameFieldContainer.classList.toggle('light-mode');
  gameField.classList.toggle('light-mode');
  score.classList.toggle('light-mode');
  soundBtn.classList.toggle('light-mode');
  if (body.classList.contains('light-mode')) {
    modeLoad = 'light';
  } else {
    modeLoad = 'dark';
  }
}
mode.addEventListener('click', changeMode);


/* ************************ */
/* RESULTS: LAST 10 WINS */
/* ************************ */

function setLastResults(timeResult, minesResult, clicksResult) {
  let result = [];
  result.push(timeResult, minesResult, clicksResult);
  
  if (lastTenResults.length === 10) {
    lastTenResults.shift();
  }
  lastTenResults.push(result);
}

function setResultsWindow() {
  let resultslWindow = document.createElement('div');
  resultslWindow.className = 'results-modal';
  let resultsCloseBtn = document.createElement('span');
  resultsCloseBtn.className = 'closeResults';
  resultslWindow.appendChild(resultsCloseBtn);
  let resultsTitle = document.createElement('h3');
  resultsTitle.className = 'results__title';
  resultslWindow.appendChild(resultsTitle);
  resultsTitle.innerHTML = 'Score:';
  let resultsList = document.createElement('ol');
  resultsList.className = 'results-list';
  resultslWindow.appendChild(resultsList);

  if (lastTenResults.length > 0) {
    for (let i = 0; i < lastTenResults.length; i += 1) {
      const resultsItem = document.createElement('li');
      resultsItem.className = 'results-item';
      resultsList.appendChild(resultsItem);
      resultsItem.innerHTML = `time: ${lastTenResults[i][0]}, mines: ${lastTenResults[i][1]}, clicks: ${lastTenResults[i][2]}`;
    }
  } else {
    resultsTitle.innerHTML = 'Score: <br><br> No games have been played yet :(';
  }

  scoreModal.appendChild(resultslWindow);
}

function showLastResults(e) {
  scoreModal.innerHTML = '';
  setResultsWindow();
  const scoreWindow = document.querySelector('.results-modal')
  const closeResultsBtn = document.querySelector('.closeResults')
  scoreWindow.style.display = 'block';

  closeResultsBtn.addEventListener('click', () => {
    scoreWindow.style.display = 'none';
  });
}
score.addEventListener('click', showLastResults);


/* ************************ */
/* SAVE GAME TO LOCALSTORAGE */
/* ************************ */

function setLocalStorage() {
  localStorage.setItem('size', size);
  localStorage.setItem('minesAmount', minesAmount);
  localStorage.setItem('mines', JSON.stringify(mines));
  localStorage.setItem('dangerNumbers', JSON.stringify(dangerNumbers));
  localStorage.setItem('openedCells', JSON.stringify(openedCells));
  localStorage.setItem('clicksCount', clicksCount);
  localStorage.myMap = JSON.stringify(Array.from(dangerMap.entries())); 
  localStorage.flaggedCellsLS = JSON.stringify([...flaggedCells]); 
  localStorage.setItem('firstClick', firstClick);
  localStorage.setItem('firstMove', firstMove);
  localStorage.setItem('lastTenResults', JSON.stringify(lastTenResults));
  localStorage.setItem('second', second);
  localStorage.setItem('minute', minute);
  localStorage.setItem('hour', hour);
  localStorage.setItem('fieldDifficulty', fieldDifficulty);
  localStorage.setItem('modeLoad', modeLoad);
  localStorage.setItem('isMuted', isMuted);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('size')) {
    let size = localStorage.getItem('size');
  } else {
    let size = 10;
  }

  if (localStorage.getItem('minesAmount')) {
    let minesAmount = localStorage.getItem('minesAmount');
  } else {
    let minesAmount = 10;
  }

  if (localStorage.getItem('mines')) {
    let mines = JSON.parse(localStorage.getItem('mines'));
  } else {
    let mines = [];
  }

  if (localStorage.getItem('dangerNumbers')) {
    let dangerNumbers = JSON.parse(localStorage.getItem('dangerNumbers'));
  } else {
    let dangerNumbers = [];
  }

  if (localStorage.getItem('openedCells')) {
    let openedCells = JSON.parse(localStorage.getItem('openedCells'));
  } else {
    let openedCells = [];
  }

  if (localStorage.getItem('clicksCount')) {
    clicksCount = localStorage.getItem('clicksCount');
  } else {
    let clicksCount = 0;
  }

  if (localStorage.getItem('myMap')) {
    let dangerMap = new Map(JSON.parse(localStorage.myMap));
  } else {
    let dangerMap = new Map();
  }

  if (localStorage.getItem('flaggedCellsLS')) {
    let flaggedCells = new Set(JSON.parse(localStorage.getItem('flaggedCellsLS')));
  } else {
    let flaggedCells = new Set();
  }

  if (localStorage.getItem('firstClick')) {
    let firstClick = localStorage.getItem('firstClick');
  } else {
    let firstClick;
  }

  if (localStorage.getItem('firstMove')) {
    let firstMove = localStorage.getItem('firstMove');
  } else {
    let firstMove = 'true';
  }

  if (localStorage.getItem('lastTenResults')) {
    let lastTenResults = JSON.parse(localStorage.getItem('lastTenResults'));
  } else {
    let lastTenResults = [];
  }

  if (localStorage.getItem('second')) {
    let second = localStorage.getItem('second');
  } else {
    let second = 0;
  }

  if (localStorage.getItem('minute')) {
    let minute = localStorage.getItem('minute');
  } else {
    let minute = 0;
  }

  if (localStorage.getItem('hour')) {
    let hour = localStorage.getItem('hour');
  } else {
    let hour = 0;
  }

  if (localStorage.getItem('fieldDifficulty')) {
    let fieldDifficulty = localStorage.getItem('fieldDifficulty');
  } else {
    let fieldDifficulty = 'easy';
  }

  if (localStorage.getItem('modeLoad')) {
    let modeLoad = localStorage.getItem('modeLoad');
  } else {
    let modeLoad = 'dark';
  }

  if (localStorage.getItem('isMuted')) {
    let isMuted = localStorage.getItem('isMuted');
  } else {
    let isMuted = 'false';
  }
}
window.addEventListener('load', getLocalStorage);

function setSavedField() {
  cells.forEach((cell) => {
    let coordsLS = cell.attributes['cell-coords'].value;

    if (dangerNumbers.includes(coordsLS)) {
      let numberOfMinesLS = dangerMap.get(`${coordsLS}`);
      cell.classList.add('danger');
      cell.classList.add(`danger-${numberOfMinesLS}`);
      cell.setAttribute('cell-number', numberOfMinesLS);

      if (openedCells.includes(coordsLS)) {
        cell.innerHTML = dangerMap.get(`${coordsLS}`);
      }
    }

    if (mines.includes(coordsLS)) {
      cell.classList.add('mined');
    }

    if (openedCells.includes(coordsLS)) {
      cell.classList.add('opened');
    }

    let flaggedCellsArr = [...flaggedCells];

    if (flaggedCellsArr.includes(coordsLS)) {
      cell.classList.add('flag');
    }
  });

  clicksNumber.innerHTML = clicksCount;
  flagsNumber.innerHTML = flagsAmount - flaggedCells.size;

  if (fieldDifficulty === 'easy') {
    easy.classList.add('active');
    medium.classList.remove('active');
    hard.classList.remove('active');
    size = 10;
    field = Math.pow(size, 2);
    container.style.width = '330px';
    gameFieldContainer.style.width = '183px';
    gameFieldContainer.style.margin = '0 auto';
    gameField.style.gridTemplateColumns = 'repeat(10, 1fr)'
  }

  if (fieldDifficulty === 'medium') {
    medium.classList.add('active');
    easy.classList.remove('active');
    hard.classList.remove('active');
    size = 15;
    field = Math.pow(size, 2);
    container.style.width = '330px';
    gameFieldContainer.style.width = '274px';
    gameFieldContainer.style.margin = '0 auto';
    gameField.style.gridTemplateColumns = 'repeat(15, 1fr)'
  } 

  if (fieldDifficulty === 'hard') {
    hard.classList.add('active');
    easy.classList.remove('active');
    medium.classList.remove('active');
    size = 25;
    field = Math.pow(size, 2);
    container.style.width = '472px';
    gameFieldContainer.style.width = '453px';
    gameFieldContainer.style.marginLeft = '-10px';
    gameField.style.gridTemplateColumns = 'repeat(25, 1fr)'
  }

  if (modeLoad === 'light') {
    body.classList.toggle('light-mode');
    header.classList.toggle('light-mode');
    h1.classList.toggle('light-mode');
    container.classList.toggle('light-mode');
    menu.classList.toggle('light-mode');
    newGame.classList.toggle('light-mode');
    mode.classList.toggle('light-mode');
    easy.classList.toggle('light-mode');
    medium.classList.toggle('light-mode');
    hard.classList.toggle('light-mode');
    minesQuantitySlider.classList.toggle('light-mode');
    infoClicks.classList.toggle('light-mode');
    infoTimer.classList.toggle('light-mode');
    infoFlags.classList.toggle('light-mode');
    gameFieldContainer.classList.toggle('light-mode');
    gameField.classList.toggle('light-mode');
    score.classList.toggle('light-mode');
    soundBtn.classList.toggle('light-mode');
  }

  if (isMuted === 'true') {
    soundBtn.classList.add('muted');
  }
}
window.addEventListener('load', setSavedField);
