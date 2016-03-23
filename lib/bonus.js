(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var COLOR = "red";
  var RADIUS = "20";

  var Util = Asteroids.Util;

  var Bonus = Asteroids.Bonus = function(pos, game) {
    this.pos = pos;
    this.game = game;
    this.radius = RADIUS;
    this.color = COLOR;
    this.vel = [0, 0];
  };

  Util.inherits(Asteroids.Bonus, Asteroids.MovingObject);


})();
