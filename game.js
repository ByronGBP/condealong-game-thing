function Game(parent) {
  var self = this;

  self.parentElement = parent;
  self.gameElement = null
  self.onGameOverCallback = null;

  self._init();
  self._startLoop();
}

Game.prototype._init = function () {
  var self = this;

  self.gameElement = buildDom(`
    <main class="game container">
      <header class="game__header">
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value"></span>
        </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
      </header>
      <div class="game__canvas">
        <canvas class="canvas"></canvas>
      </div>
    </main>
  `)
  self.parentElement.appendChild(self.gameElement);

  self.canvasParentElement = document.querySelector('.game__canvas');
  self.canvasElement = document.querySelector('.canvas');

  self.livesElement = self.gameElement.querySelector('.lives .value');
  self.scoreElement = self.gameElement.querySelector('.score .value');

  self.width = self.canvasParentElement.clientWidth;
  self.height = self.canvasParentElement.clientHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.ctx = self.canvasElement.getContext('2d');
}

Game.prototype._startLoop = function () {
  var self = this;

  self.score = 0;
  self.enemies = [];
  self.player = new Player(self.canvasElement);

  self.handleKeyDown = function (evt) {
    if (evt.key === "ArrowDown") {
      self.player.setDirection(1)
    }
    if (evt.key === "ArrowUp") {
      self.player.setDirection(-1)
    }
  }

  document.addEventListener('keydown', self.handleKeyDown);

  function loop() {
    self._clearAll();
    self._updateAll();
    self._renderAll();

    if (self._isPlayerAlive()) {
      requestAnimationFrame(loop);
    } else {
      self.onGameOverCallback();
    }
  }

  requestAnimationFrame(loop);
}

Game.prototype._updateAll = function ()  {
  var self = this;

  self._spawnEnemy();

  self.enemies.forEach(function(item) {
    item.update();
  })

  self.enemies = self.enemies.filter(function(item) {
    if (item.isDeath()) {
      self.score += 1;
      return false;
    }
    return true;
  })

  self.player.update();

  self._checkAllCollision();

  self._updateUI();

}

Game.prototype._renderAll = function ()  {
  var self = this;

  self.enemies.forEach(function(item) {
    item.render();
  })

  self.player.render();

}

Game.prototype._clearAll = function ()  {
  var self = this;

  self.ctx.clearRect(0, 0, self.width, self.height);
}

Game.prototype._spawnEnemy = function ()  {
  var self = this;

  if (Math.random() > 0.97) {
    var randomY = Math.random() * self.height * 0.8;
    self.enemies.push(new Enemy(self.canvasElement, self.width, randomY));
  }
}

Game.prototype._checkAllCollision = function() {
  var self = this;

  self.enemies.forEach(function(item, idx) {
    if(self.player.checkCollision(item)) {
      self.enemies.splice(idx, 1);
      self.player.collided();
    }
  });
}

Game.prototype._isPlayerAlive = function () {
  var self = this;

  return self.player.lives > 0;
}

Game.prototype._updateUI = function() {
  var self = this;

  self.scoreElement.innerText = self.score;
  self.livesElement.innerText = self.player.lives;
}

Game.prototype.onOver = function (callback) {
  var self = this;

  self.onGameOverCallback = callback;
}

Game.prototype.destroy = function () {
  var self = this;

  self.gameElement.remove();
  document.removeEventListener('keydown', self.handleKeyDown);
  //Remove setInterval if you have one
}

