(function() {
  if (typeof Asteroids === "underfined") {
    window.Asteroids = {};
  }

  var RADIUS = "10";
  var Util = Asteroids.Util;

  var lifeBonus = Asteroids.lifeBonus = function(pos, game) {
    this.pos = pos;
    this.game = game;
    this.radius = RADIUS;
    this.vel = [0, 0];
    this.lifeImg = new Image();
    this.lifeImg.src = "./lib/life.png";
  };

  Util.inherits(Asteroids.lifeBonus, Asteroids.MovingObject);

  lifeBonus.prototype.draw = function(ctx) {
    ctx.save();
    ctx.drawImage(this.lifeImg, this.pos[0], this.pos[1],
        2 * this.radius, 2 * this.radius);
    ctx.restore();
  }

})();
