//Dont do global variables
var globalColors = [
  '#001B1E',
  '#009CAD',
  '#00E5FF',
  '#70F0FF',
  '#E8FCFF'
]

function Enemy(canvas, x, y) {
  var self = this;

  self.x = x - 20;
  self.y = y;
  self.size = 20;
  self.vel = 5;
  self.ctx = canvas.getContext('2d');
}

Enemy.prototype.update = function () {
  var self = this;

  self.x -= self.vel;
}

//Don't do this
var currentIdx = 0;
var offsetIdx = 1;
Enemy.prototype.render = function () {
  var self = this;

  if (currentIdx > globalColors.length - 1 || currentIdx === 0) {
    offsetIdx *= -1;
  }

  self.ctx.fillStyle = globalColors[currentIdx];
  self.ctx.fillRect(self.x, self.y, self.size, self.size);

  currentIdx += offsetIdx;
}

Enemy.prototype.isDeath = function () {
  var self = this;

  return (self.x + self.size) < 0;
}
