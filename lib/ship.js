(function() {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }
  var Util = Asteroids.Util;

  var Ship = Asteroids.Ship = function(pos, game, enemyBool){
    this.enemyBool = enemyBool || false;
    this.vel = [0, 0];
    this.radius = 18;
    this.pos = pos;
    this.game = game;
    this.shipImg = new Image();
    if (enemyBool) {
      this.shipImg.src = "./lib/shipred.gif";
    } else {
      this.shipImg.src = "./lib/ship.gif";
      this.destroyed = false;
      this.invincible = true;
      this.alreadySetInvincible = false;
      this.setInvincible();
      setTimeout(function() {
        this.invincible = false;
      }.bind(this), 3000); 
    }
    this.angle = 3*Math.PI/2;
    this.width = 20;
    this.height = 20;
    this.lives = 3;
    this.time = 0; 
  };

  Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Ship.MAX_SPEED = 6;

  Ship.prototype.power = function(impulse) {
    // var impulse_x = impulse[0];
    // var impulse_y = impulse[1];
    // var vel_x = this.vel[0];
    // var vel_y = this.vel[1];
    // this.vel = [vel_x + impulse_x, vel_y + impulse_y];
    // if (this.vel[0] <= 1 && this.vel[1] <= 1) {

    var vel = Asteroids.Util.unitVec(this.angle);
    var newVel = [this.vel[0] + (vel[0] * 0.15), this.vel[1] + (vel[1] * 0.15)];

    if (Math.abs(newVel[0]) < Ship.MAX_SPEED && Math.abs(newVel[1]) < Ship.MAX_SPEED){
      this.vel = newVel;
    }

  };

  Ship.prototype.slow = function(impulse) {
    var vel = Asteroids.Util.unitVec(this.angle);
    var newVel = [this.vel[0] - (vel[0] * 0.15), this.vel[1] - (vel[1] * 0.15)];
    if (newVel[0] < Ship.MAX_SPEED && newVel[1] < Ship.MAX_SPEED ){
      this.vel = newVel;
    }
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
      this.destroyed = true;
      this.handleExplosion();
      this.vel[0] /= 3;
      this.vel[1] /= 3;
      if (!(this instanceof Asteroids.enemyShip)) {
        setTimeout(function() {
          this.pos[0] = this.game.DIM_X / 2;
          this.game.lives -= 1;
          this.vel[0] = 0;
          this.vel[1] = 0;
          this.pos[1] = this.game.DIM_Y / 2;
        }.bind(this), 1100);
        setTimeout(function() {
          this.invincible = false;
        }.bind(this), 3400);
      }
    }
    if (this instanceof Asteroids.enemyShip) {
      setTimeout(function() {
        this.game.remove(this);
      }.bind(this), 1100);
    }
  };

  Ship.prototype.setInvincible = function() {
    this.alreadySetInvincible = true;
    this.shipImg.src = "./lib/shipred.gif";
      setTimeout(function() { 
      this.shipImg.src = "./lib/ship.gif"; 
      this.invincible = false;
      this.alreadySetInvincible = false;
    }.bind(this), 2000);
  }

  Ship.prototype.invincibleBonus = function() {
    this.alreadySetInvincible = true;
    this.shipImg.src = "./lib/shipred.gif";
      setTimeout(function() { 
      this.shipImg.src = "./lib/ship.gif"; 
      this.invincible = false;
      this.alreadySetInvincible = false;
    }.bind(this), 2000);
  }

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
    if (this.destroyed) {
      this.drawExplosion(ctx);
    } else if (this.invincible && !this.alreadySetInvincible) {
      this.setInvincible();
      ctx.rotate(this.angle);
      ctx.drawImage(this.shipImg, -20, -20, 2 * this.width, 2 * this.height);
    } else {
      ctx.rotate(this.angle);
      ctx.drawImage(this.shipImg, -20, -20, 2 * this.width, 2 * this.height);
    };
    ctx.restore();
  };

  Ship.prototype.drawExplosion = function(ctx) {
    if (this.spriteFrame <= 18) {
      if (this.spriteInterval % 3 === 0) {
        this.spriteXDIM += 66;

        if (this.spriteFrame % 6 === 0) {
          this.spriteXDIM = 0;
          this.spriteYDIM += 66;
        }

        this.spriteFrame += 1;
      }
      this.spriteInterval += 1;
    } else {
      this.destroyed = false;
      //this.loseLife();
      this.shipImg.src = "./lib/ship.gif"; 
    };
    ctx.drawImage(this.shipImg, this.spriteXDIM, this.spriteYDIM, 66, 66, -40, -40, 140, 140);
  };

  Ship.prototype.handleExplosion = function() {
    this.radius = "0";
    this.spriteFrame = 1;
    this.spriteInterval = 0;
    this.spriteXDIM = 0;
    this.spriteYDIM = 0;
    this.shipImg = new Image();
    this.shipImg.src = "./lib/explosion.png";
    var that = this;
  }

  Ship.prototype.fireBullet = function(firingTimeout, fireOffset) {
    var fireOffset = fireOffset || 0; //enemy firing inaccuracy
    var firingTimeout = firingTimeout || 0; // enemy firing timeout
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
      }.bind(this), 130 + timeoutOffset + firingTimeout);
      var randomizedFireOffset = (Math.random() * fireOffset) - fireOffset/2;
      var angle = this.angle + randomizedFireOffset;
      var vel = Asteroids.Util.unitVec(angle);
      var bullet = new Asteroids.Bullet(this.pos, this.game, vel, this);
      this.game.add(bullet);
    }
  };
  })();
