(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var COLOR = "orange";
  var RADIUS = "5";
  var Util = Asteroids.Util;

  var Bullet = Asteroids.Bullet = function(pos, game, vel, ship) {
    this.game = game;
    this.ship = ship || this.game.ships[0];
    this.pos = pos;
    var x_vel = vel[0];
    var y_vel = vel[1];
    this.vel = [x_vel * 8, y_vel * 8];
    this.radius = 5;
    this.color = "orange";
    this.bulletSound = new Audio("./lib/laser.mp3");
    
//    this.bulletSound.play();
  };

  Util.inherits(Asteroids.Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function() {
    var asteroids = this.game.asteroids;
    var ships = this.game.ships;
    var that = this;
    asteroids.forEach(function (asteroid) {
      if (that.isCollidedWith(asteroid)) {
        that.game.points += (10 * that.game.level);
        that.game.remove(asteroid);
        that.game.remove(that);
      }
    });
    ships.forEach(function (ship) {
      if (that.isCollidedWith(ship) && !(that.ship === ship)) {
        ship.loseLife();
        that.game.remove(that);
      }
    });
  };

  Bullet.prototype.isWrappable = false;

})();
