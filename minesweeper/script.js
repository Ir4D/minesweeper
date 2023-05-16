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
const gameField = document.createElement('div');

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
gameField.className = 'game__field';

h1.innerHTML = 'Minesweeper';
newGame.innerHTML = 'New game';

body.appendChild(header);
header.appendChild(h1);
body.appendChild(main);
main.appendChild(container);
container.appendChild(menu);
menu.appendChild(newGame);
menu.appendChild(settings);
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
game.appendChild(gameField);
gameField.classList.add('field');


function initField() {
  for (let i = 0; i < 100; i += 1) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    gameField.appendChild(cell);
  }
}

initField();
