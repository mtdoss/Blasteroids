(function() {
	if (typeof Asteroids === "undefined"){
		window.Asteroids = {};
	}
  var Util = Asteroids.Util;

  var Ship = Asteroids.Ship = function(pos, game){
   this.vel = [0, 0];
   this.radius = 10;
   this.color = "blue";
   this.pos = pos;
   this.game = game;
   this.shipImg = new Image();
   this.shipImg.src = "./lib/ship.gif";
   this.angle = 0;
   this.width = 20;
   this.height = 20;
 };

 Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

 Ship.prototype.power = function(impulse) {
  // var impulse_x = impulse[0];
  // var impulse_y = impulse[1];
  // var vel_x = this.vel[0];
  // var vel_y = this.vel[1];
  // this.vel = [vel_x + impulse_x, vel_y + impulse_y];

  var vel = Asteroids.Util.unitVec(this.angle);
  var newVel = [this.vel[0] + (vel[0] * .15), this.vel[1] + (vel[1] * .15)];
  this.vel = newVel;
};

Ship.prototype.slow = function(impulse) {
  var vel = Asteroids.Util.unitVec(this.angle);
  var newVel = [this.vel[0] - (vel[0] * .15), this.vel[1] - (vel[1] * .15)];
  this.vel = newVel;
};

Ship.prototype.turnLeft = function() {
  this.angle -= 0.15;
};

Ship.prototype.turnRight = function() {
  this.angle += 0.15;
};

Ship.prototype.collideWith = function() {
  var asteroids = this.game.asteroids;
  var that = this;
  asteroids.forEach(function (asteroid) {
    if (that.isCollidedWith(asteroid)) {
      console.log('you lose!');
    }
  });
};

Ship.prototype.draw = function(ctx){
  // var root3 = Math.sqrt(3);
  // ctx.save();
  // var xCoord = this.pos[0];
  // var yCoord = this.pos[1];
  // // ctx.translate(this.pos[0], this.pos[1]);
  // ctx.rotate(this.angle);
  // ctx.fillStyle = this.color;
  // ctx.beginPath();
  // ctx.moveTo(xCoord, yCoord + (this.radius * root3));
  // ctx.lineTo(xCoord + this.radius, (yCoord + -0.5 * this.radius * root3));
  // ctx.lineTo(xCoord - this.radius, (yCoord + -0.5 * this.radius * root3));
  // ctx.closePath();
  // // ctx.drawImage(this.shipImg, 0, 0, 200, 200, xCoord, yCoord, 20, 20);

  // ctx.fill();
  // ctx.restore();

  ctx.save();
  ctx.translate(this.pos[0], this.pos[1]);
  ctx.rotate(this.angle);
  ctx.drawImage(this.shipImg, -20, -20, 40, 40);
  ctx.restore();
};

Ship.prototype.fireBullet = function() {
  // if (this.vel[0] >= 0) {
  //   x_factor = 1;
  // } else if (this.vel[0] < 0) {
  //   x_factor = -1;
  // }

  // if (this.vel[1] >= 0) {
  //   y_factor = 1;
  // } else if (this.vel[1] < 0) {
  //   y_factor = -1;
  // }
  // var vel = [6 * x_factor, 6 * y_factor];
  var vel = Asteroids.Util.unitVec(this.angle);
  var bullet = new Asteroids.Bullet(this.pos, this.game, vel);
  this.game.add(bullet);
};
})();