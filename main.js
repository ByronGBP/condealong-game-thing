
function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main() {

  var mainContainerElement = document.querySelector('#main-container');

  // -- Splash
  var splashElement = null;
  var splashButton = null;

  var handleSplashClick = function () {
    destroySplash();
    buildGame();
  }

  function buildSplash() {
    splashElement = buildDom(`
      <main class="splash container">
        <h1 class="splash__title">Canvas epic game</h1>
        <button>Start</button>
      </main>
    `)
    mainContainerElement.appendChild(splashElement);

    splashButton = document.querySelector('button');
    splashButton.addEventListener('click', handleSplashClick)

  }
  function destroySplash() {
    splashButton.removeEventListener('click', handleSplashClick);
    splashElement.remove();
  }

  // -- Game
  var game = null;
  var handleGameOver = function () {
    destroyGame();
    buildGameover();
  };

  function buildGame() {
    setTimeout(() => {
      handleGameOver();
    }, 1000);
  }
  function destroyGame() {
  }

  // -- Gameover
  var gameoverElement = null;
  var gameoverButton = null;
  var handleGameoverClick = function () {
    destroyGameover();
    buildSplash();
  }

  function buildGameover(score) {
    gameoverElement = buildDom(`
      <main class="gameover container">
        <h1>Game over</h1>
        <p>Your score: <span class="score"></span></p>
        <button>Restart</button>
      </main>
    `);

    mainContainerElement.appendChild(gameoverElement);
    gameoverButton = document.querySelector('button');
    gameoverButton.addEventListener('click', handleGameoverClick);

    var scoreElement = document.querySelector('.score');
    scoreElement.innerText = 0;
  }

  function destroyGameover() {
    gameoverButton.removeEventListener('click', handleGameoverClick);
    gameoverElement.remove();
  }

  buildSplash();
}

document.addEventListener('DOMContentLoaded', main);