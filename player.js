
function Player(canvas) {
  var self = this;

  self.x = 0;
  self.y = 0;
  self.vel = 5;
  self.size = 60;
  self.direction = 0;
  self.lives = 1;
  self.ctx = canvas.getContext('2d');
}

Player.prototype.update = function () {
  var self = this;

  self.y += (self.vel * self.direction);
  self._checkLimits();
}

Player.prototype.render = function () {
  var self = this;
  var randomIdx = Math.floor(Math.random() * globalColors.length);

  self.ctx.fillStyle = globalColors[randomIdx];
  self.ctx.fillRect(self.x, self.y, self.size, self.size);
}

Player.prototype.setDirection = function (direction) {
  var self = this;

  self.direction = direction
}

Player.prototype._checkLimits = function () {
  var self = this;
  if (self.y < 0) {
    self.setDirection(1);
  }
  else if (self.y > self.ctx.canvas.height - self.size) {
    self.setDirection(-1);
  }
}

Player.prototype.checkCollision = function (object) {
  var self = this;

  var crashRight = self.x + self.size > object.x;
  var crashBottom = self.y + self.size > object.y;
  var crashTop = self.y < object.y + object.size;
  var crashLeft = self.x < object.x + object.size;

  if (crashLeft && crashRight && crashTop && crashBottom) {
    return true;
  }

  return false;
}

Player.prototype.collided = function () {
  var self = this;

  self.lives -= 1;
}