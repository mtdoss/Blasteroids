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
    this.vel = Util.randomVec(3);
    this.game = game;
    this.astImg = new Image();
    this.astImg.src = "./assets/asteroid.png";
  };
  Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);


  Asteroid.prototype.draw = function(ctx){
  ctx.save();
  ctx.translate(this.pos[0], this.pos[1]);
  ctx.drawImage(this.astImg, -30, -30, 60, 60);
  ctx.restore();
};
})();
