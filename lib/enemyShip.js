(function() {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }  
  var Util = Asteroids.Util;

  var enemyShip = Asteroids.enemyShip = function(pos, game, enemyBool){
    Asteroids.Ship.call(this, pos, game, enemyBool);
    console.log("I'm in the constructor");
    this.angle = 0;
    console.log(this.angle);
  }

  Util.inherits(Asteroids.enemyShip, Asteroids.Ship);
})();
