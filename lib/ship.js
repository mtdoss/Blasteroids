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
   this.lives = 3;
 };

 Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

 Ship.prototype.power = function(impulse) {
  // var impulse_x = impulse[0];
  // var impulse_y = impulse[1];
  // var vel_x = this.vel[0];
  // var vel_y = this.vel[1];
  // this.vel = [vel_x + impulse_x, vel_y + impulse_y];
  // if (this.vel[0] <= 1 && this.vel[1] <= 1) {
    var vel = Asteroids.Util.unitVec(this.angle);
    var newVel = [this.vel[0] + (vel[0] * 0.15), this.vel[1] + (vel[1] * 0.15)];
    this.vel = newVel;
  // }
  
};

Ship.prototype.slow = function(impulse) {
  var vel = Asteroids.Util.unitVec(this.angle);
  var newVel = [this.vel[0] - (vel[0] * 0.15), this.vel[1] - (vel[1] * 0.15)];
  this.vel = newVel;
  // if (this.vel[0] <= 0.01 && this.vel[0] >= 0.01) {
  //   this.vel[0] = 0;
  // } else {
  //   this.vel[0] /= 1.05;
  // }

  // if (this.vel[1] <= 0.01 && this.vel[1] >= 0.01) {
  //   this.vel[1] = 0;
  // } else {
  //   this.vel[1] /= 1.05;
  // }
};

Ship.prototype.turnLeft = function() {
  this.angle -= 0.15;
};

Ship.prototype.turnRight = function() {
  this.angle += 0.15;
};

Ship.prototype.loseLife = function() {
  if (!this.invincible) {
    this.invincible = true;
    setTimeout(function() {
      this.invincible = false;
    }.bind(this), 1000);
    this.game.lives -= 1;
    this.pos[0] = this.game.DIM_X / 2;
    this.pos[1] = this.game.DIM_Y / 2;
  }
};

Ship.prototype.collideWith = function() {
  var game = this.game;
  var asteroids = game.asteroids;
  var bonuses = game.bonuses;
  var that = this;
  asteroids.forEach(function (asteroid) {
    if (that.isCollidedWith(asteroid)) {
      that.loseLife();
    }
  });
  bonuses.forEach(function (bonus) {
    if (that.isCollidedWith(bonus)) {
      game.remove(bonus);
      game.points += 1000;
    }
  });
};

Ship.prototype.draw = function(ctx){
  ctx.save();
  ctx.translate(this.pos[0], this.pos[1]);
  ctx.rotate(this.angle);
  ctx.drawImage(this.shipImg, -20, -20, 40, 40);
  ctx.restore();
};

Ship.prototype.fireBullet = function() {
  var timeoutOffset = 0;
  if (this.game.level <= 10) {
   timeoutOffset = this.game.level * 10;
 } else {
   timeoutOffset = 100;
 }
 if (!this.firing) {
  this.firing = true;
  setTimeout(function() {
    this.firing = false;
  }.bind(this), 130 + timeoutOffset);

  var vel = Asteroids.Util.unitVec(this.angle);
  var bullet = new Asteroids.Bullet(this.pos, this.game, vel);
  this.game.add(bullet);
}
};
})();