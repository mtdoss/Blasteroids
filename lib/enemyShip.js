(function() {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }  
  var Util = Asteroids.Util;

  var enemyShip = Asteroids.enemyShip = function(pos, game, enemyBool){
    Asteroids.Ship.call(this, pos, game, enemyBool);
    this.angle = 0;
    this.playerShip = game.ships[0];
    if (this.game.level >= 10) {
      this.firingInaccuracy = .1;
    } else {
      this.firingInaccuracy = .3 - .02 * this.game.level;
    }
  }

  Util.inherits(Asteroids.enemyShip, Asteroids.Ship);

  // enemyShip.FIRING_INACCURACY = .3;

  enemyShip.prototype.trackShip = function(){
    var ship = this.playerShip;
    var enemyPos = this.pos;
    var playerPos = ship.pos;
    var opp = enemyPos[1] - playerPos[1];
    var adj = enemyPos[0] - playerPos[0];
    this.angle = Math.atan2(opp, adj) + 3*Math.PI / 2;
  }

  enemyShip.prototype.fire = function() {
    this.fireBullet(2000, this.firingInaccuracy);
  }
})();
