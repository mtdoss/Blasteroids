(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var COLOR = "red";
  var RADIUS = "20";
  
  var Util = Asteroids.Util;

  
  var Asteroid = Asteroids.Asteroid = function(pos, game){
    this.pos = pos;
    this.color = COLOR;
    this.radius = RADIUS;
    this.vel = Util.randomVec(5);
    this.game = game;
  };
  Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

})();