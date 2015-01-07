(function() {
  if (typeof Asteroids === "underfined") {
    window.Asteroids = {};
  }

  var RADIUS = "10";
  var Util = Asteroids.Util;

 window.myVar;

  var lifeBonus = Asteroids.lifeBonus = function(pos, game) {
    this.pos = pos;
    this.game = game;
    this.radius = RADIUS;
    this.vel = [0, 0];
    this.lifeImg = new Image();
    this.lifeImg.src = "./lib/life.png";
    this.flashing = false;
    this.drawFlashingBool = true;
    this.swapping = false;
    setTimeout(function() {
      this.flashing = true;
    }.bind(this), 15000);
    // setTimeout(function() {
    //  this.game.remove(this);
    // }.bind(this), 20000);
    this.removeLifeBonus();
  };


  Util.inherits(Asteroids.lifeBonus, Asteroids.MovingObject);

  lifeBonus.prototype.removeLifeBonus = function(){
    myVar = setTimeout(function() {
      this.game.remove(this);
    }, 20000);
  };

  lifeBonus.prototype.drawFlashing = function(){
    if (!this.swapping) {
      this.swapping = true;
      setTimeout(function() {
        this.swapDrawFlashing();
        this.swapping = false;
      }.bind(this), 300);
    }
  };

  lifeBonus.prototype.swapDrawFlashing = function() {
    if (this.drawFlashingBool) {
      this.drawFlashingBool = false;
    } else {
      this.drawFlashingBool = true;
    }
  };

  lifeBonus.prototype.draw = function(ctx) {
    ctx.save();
    if (this.flashing) {
      this.drawFlashing();
    }
    if (this.drawFlashingBool) {
      ctx.drawImage(this.lifeImg, this.pos[0] - 10, this.pos[1] - 10,
          2 * this.radius, 2 * this.radius);
    }
    ctx.restore();
  };

})();
