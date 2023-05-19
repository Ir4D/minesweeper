const body = document.querySelector('body');
const header = document.createElement('header');
const h1 = document.createElement('h1');
const main = document.createElement('main');
const container = document.createElement('div');
const menu = document.createElement('div');
const newGame = document.createElement('div');
const settings = document.createElement('div');
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

body.className = 'body';
header.className = 'header';
h1.className = 'game-title';
main.className = 'main';
container.className = 'container';
menu.className = 'menu';
newGame.className = 'new-game';
settings.className = 'settings';
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

body.appendChild(header);
header.appendChild(h1);
body.appendChild(main);
main.appendChild(container);
container.appendChild(menu);
menu.appendChild(newGame);
menu.appendChild(settings);
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

h1.innerHTML = 'Minesweeper';
newGame.innerHTML = 'New game';
timerNumber.innerHTML = '00:00:00';

let size = 10;
let minesAmount = 2;
let field = Math.pow(size, 2);
let mines = [];
let dangerNumbers = [];
let x = 0; // coordinate x in the game field
let y = 0; // coordinate y in the game field
let openedCells = [];
let dangerMap = new Map();
let clicksCount = 0;
let flagsAmount = minesAmount;
let flaggedCells = new Set();
let timeCount;
let firstClick;
let firstMove = true;
let second = 00,
    minute = 00,
    hour = 00;
let gameEnd = false;
clicksNumber.innerHTML = clicksCount;
flagsNumber.innerHTML = flagsAmount;


// CREATE GAME FIELD

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
}
initField();


// SET MINES

function setMines(firstClick) {
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
      let random = Math.floor(Math.random() * (max - min + 1)) + min;
      res.add(random);
    }
    return res;
  }
  let mySet = getRandomSet(0, field - 1, minesAmount);
  for (const item of mySet) {
    if (item < 10) {
      mines.push('0' + ',' + String(item).split('').join(','));
    } else {
      mines.push(String(item).split('').join(','));
    }
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


// INIT

function init(firstClick) {
  setMines(firstClick);

  function setDangerNumbers() {
    mines.forEach(item => {
      let x = Number(item[0]);
      let y = Number(item[2]);
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
    let coords = number.split(',');
    let dangerCell = document.querySelectorAll(`[cell-coords="${parseInt(coords[0])},${parseInt(coords[1])}"]`)[0];
    let numberOfMines = parseInt(dangerCell.getAttribute('cell-number'));
    if (!numberOfMines) {
      numberOfMines = 0;
    }
    numberOfMines = numberOfMines + 1;
    dangerCell.setAttribute('cell-number', numberOfMines);
    dangerCell.classList.add('danger');
    dangerCell.classList.add(`danger-${numberOfMines}`);
    dangerMap.set(number, numberOfMines);
  })
};


// TIMER

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

function countTime() {
  timeCount = setInterval(
    timer,
    1000
  )
}
countTime();


// MODAL WINDOW

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


// CLICK ACTIONS

function handleClick(e) {
  let cells = document.querySelectorAll('.cell');
  if (firstMove) {
    firstClick = e.target.attributes['cell-coords'].value;
    init(firstClick);
  }
  let cellValue = e.target.attributes['cell-coords'].value;
  
  if (e.target.classList.contains('flag')) {
    return;
  }
  if (!e.target.classList.contains('opened')) {
    clicksCount++;
    addClicks();
  }
  e.target.classList.add('opened');
  firstMove = false;
  if (dangerMap.has(cellValue)) {
    e.target.innerHTML = dangerMap.get(cellValue);
  }
  openedCells.push(cellValue);
  if (e.target.classList.contains('cell')) {
    let openedCellCoords = e.target.attributes['cell-coords'].value;
    let targetCellX = Number(openedCellCoords[0]);
    let targetCellY = Number(openedCellCoords[2]);
    
    function findEmptyCells(targetCellX, targetCellY) {
      cells.forEach(cell => {
        let x = Number(cell.attributes['cell-coords'].value[0]);
        let y = Number(cell.attributes['cell-coords'].value[2]);
        function checkFlag() {
          if (cell.classList.contains('flag')) {
            cell.classList.toggle('flag');
            flaggedCells.delete(cell.attributes['cell-coords'].value);
            updateFlagsAmount();
          } 
        }
        if (x === targetCellX + 1 && y === targetCellY) {
          if (!mines.includes(`${x},${y}`) && !dangerNumbers.includes(`${x},${y}`) && !openedCells.includes(`${x},${y}`)) {
            checkFlag();
            cell.classList.add('opened');
            openedCells.push(`${x},${y}`);
            findEmptyCells(x, y);
          } else if (dangerNumbers.includes(`${x},${y}`)) {
            checkFlag();
            cell.classList.add('opened');
            openedCells.push(`${x},${y}`);
            cell.innerHTML = dangerMap.get(`${x},${y}`);
          }
        }
        if (x === targetCellX + 1 && y === targetCellY + 1) {
          if (!mines.includes(`${x},${y}`) && !dangerNumbers.includes(`${x},${y}`) && !openedCells.includes(`${x},${y}`)) {
            checkFlag();
            cell.classList.add('opened');
            openedCells.push(`${x},${y}`);
            findEmptyCells(x, y);
          } else if (dangerNumbers.includes(`${x},${y}`)) {
            checkFlag();
            cell.classList.add('opened');
            openedCells.push(`${x},${y}`);
            cell.innerHTML = dangerMap.get(`${x},${y}`);
          }
        }
        if (x === targetCellX && y === targetCellY + 1) {
          if (!mines.includes(`${x},${y}`) && !dangerNumbers.includes(`${x},${y}`) && !openedCells.includes(`${x},${y}`)) {
            checkFlag();
            cell.classList.add('opened');
            openedCells.push(`${x},${y}`);
            findEmptyCells(x, y);
          } else if (dangerNumbers.includes(`${x},${y}`)) {
            checkFlag();
            cell.classList.add('opened');
            openedCells.push(`${x},${y}`);
            cell.innerHTML = dangerMap.get(`${x},${y}`);
          }
        }
        if (x === targetCellX - 1 && y === targetCellY + 1) {
          if (!mines.includes(`${x},${y}`) && !dangerNumbers.includes(`${x},${y}`) && !openedCells.includes(`${x},${y}`)) {
            checkFlag();
            cell.classList.add('opened');
            openedCells.push(`${x},${y}`);
            findEmptyCells(x, y);
          } else if (dangerNumbers.includes(`${x},${y}`)) {
            checkFlag();
            cell.classList.add('opened');
            openedCells.push(`${x},${y}`);
            cell.innerHTML = dangerMap.get(`${x},${y}`);
          }
        }
        if (x === targetCellX - 1 && y === targetCellY) {
          if (!mines.includes(`${x},${y}`) && !dangerNumbers.includes(`${x},${y}`) && !openedCells.includes(`${x},${y}`)) {
            checkFlag();
            cell.classList.add('opened');
            openedCells.push(`${x},${y}`);
            findEmptyCells(x, y);
          } else if (dangerNumbers.includes(`${x},${y}`)) {
            checkFlag();
            cell.classList.add('opened');
            openedCells.push(`${x},${y}`);
            cell.innerHTML = dangerMap.get(`${x},${y}`);
          }
        }
        if (x === targetCellX - 1 && y === targetCellY - 1) {
          if (!mines.includes(`${x},${y}`) && !dangerNumbers.includes(`${x},${y}`) && !openedCells.includes(`${x},${y}`)) {
            checkFlag();
            cell.classList.add('opened');
            openedCells.push(`${x},${y}`);
            findEmptyCells(x, y);
          } else if (dangerNumbers.includes(`${x},${y}`)) {
            checkFlag();
            cell.classList.add('opened');
            openedCells.push(`${x},${y}`);
            cell.innerHTML = dangerMap.get(`${x},${y}`);
          }
        }
        if (x === targetCellX && y === targetCellY - 1) {
          if (!mines.includes(`${x},${y}`) && !dangerNumbers.includes(`${x},${y}`) && !openedCells.includes(`${x},${y}`)) {
            checkFlag();
            cell.classList.add('opened');
            openedCells.push(`${x},${y}`);
            findEmptyCells(x, y);
          } else if (dangerNumbers.includes(`${x},${y}`)) {
            checkFlag();
            cell.classList.add('opened');
            openedCells.push(`${x},${y}`);
            cell.innerHTML = dangerMap.get(`${x},${y}`);
          }
        }
        if (x === targetCellX + 1 && y === targetCellY - 1) {
          if (!mines.includes(`${x},${y}`) && !dangerNumbers.includes(`${x},${y}`) && !openedCells.includes(`${x},${y}`)) {
            checkFlag();
            cell.classList.add('opened');
            openedCells.push(`${x},${y}`);
            findEmptyCells(x, y);
          } else if (dangerNumbers.includes(`${x},${y}`)) {
            checkFlag();
            cell.classList.add('opened');
            openedCells.push(`${x},${y}`);
            cell.innerHTML = dangerMap.get(`${x},${y}`);
          }
        }
      });
    }
    if (!mines.includes(openedCellCoords) && !dangerNumbers.includes(openedCellCoords)) {
      findEmptyCells(targetCellX, targetCellY);
    } else if (mines.includes(openedCellCoords)) {
      let gameResultText = `GAME OVER <br> Game time: ${timerNumber.innerText}`;
      gameModal.innerHTML = '';
      setModalWindow(gameResultText);
      const modal = document.querySelector('.modal')
      const closeBtn = document.querySelector('.close')
      modal.style.display = 'block';
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      })
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


// STOP GAME

function stopGame() {
  if (gameEnd) {
    gameField.removeEventListener('click', handleClick);
    gameField.removeEventListener('contextmenu', setFlag);
    gameField.removeEventListener('click', setWin);
  }
  clearInterval(timeCount);
}


// FLAGS

let cells = document.querySelectorAll('.cell');

function setFlag(e) {
  e.preventDefault();
  if (!e.target.classList.contains('opened')) {
    e.target.classList.toggle('flag');
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
  cells.forEach(cell => {
    if (flaggedCells.has(cell.attributes['cell-coords'].value)) {
      cell.classList.add('flag');
    } else {
      cell.classList.remove('flag');
    }
  });
}


// WIN GAME

function isWinGameFlags(mines, flaggedCells) {
  let b = Array.from(flaggedCells).sort( (a, b) => a.localeCompare(b) );
  let a = mines.sort( (a, b) => a.localeCompare(b) );
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
};

function isWinGameNoFlags() {
  let closedCells = [];
  cells.forEach(cell => {
    if (!openedCells.includes(cell.attributes['cell-coords'].value)) {
      closedCells.push(cell.attributes['cell-coords'].value);
    }
  });
  let a = mines.sort( (a, b) => a.localeCompare(b) );
  let b = closedCells.sort( (a, b) => a.localeCompare(b) );
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

function setWin(e) {
  if (isWinGameFlags(mines, flaggedCells) || isWinGameNoFlags()) {
    let gameResultText = `YOU WIN! <br> Game time: ${timerNumber.innerText} <br> Clicks: ${clicksNumber.innerText}`;
    gameModal.innerHTML = '';
    setModalWindow(gameResultText);
    const modal = document.querySelector('.modal')
    const closeBtn = document.querySelector('.close')
    modal.style.display = 'block';
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    })
    gameEnd = true;
    stopGame();
  }
}
gameField.addEventListener('click', setWin);


// START NEW GAME

function startNewGame() {
  firstClick = true;
  firstMove = true;
  second = 00;
  minute = 00;
  hour = 00;
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
  countTime();
  gameField.addEventListener('click', handleClick);
  gameField.addEventListener('contextmenu', setFlag);
  gameField.addEventListener('click', setWin);
}
newGame.addEventListener('click', startNewGame);
