(function() {
  if (typeof Asteroids === "underfined") {
    window.Asteroids = {};
  }

  var RADIUS = "20";
  var Util = Asteroids.Util;

  var lifeBonus = Asteroids.lifeBonus = function(pos, game) {
    this.pos = pos;
    this.game = game;
    this.radius = RADIUS;
    this.vel = [0, 0];
    this.lifeImg = new Image();
    this.lifeImg.src = "./assets/life.png";
    this.getLifeSound = new Audio("./assets/getLife.mp3");
    this.flashing = false;
    this.drawFlashingBool = true;
    this.swapping = false;
    this.timeoutID =  setTimeout(function() {
      this.flashing = true;
     this.timeoutID2 = setTimeout(function() {
        this.game.remove(this);
      }.bind(this), 5000);
    }.bind(this), 15000);
    this.game.timeouts.push(this.timeoutID);
    this.game.timeouts.push(this.timeoutID2);
    // setTimeout(function() {
    // this.game.remove(this);
    // }.bind(this), 20000);
  };

  Util.inherits(Asteroids.lifeBonus, Asteroids.MovingObject);

  lifeBonus.prototype.drawFlashing = function(){
    if (!this.swapping) {
      this.swapping = true;
      setTimeout(function() {
        this.swapDrawFlashing();
        this.swapping = false;
      }.bind(this), 300);
    }
  };

  lifeBonus.prototype.removeSelf = function() {
    var timeouts = this.game.timeouts;
    var index = timeouts.indexOf(this.timeoutID);
    var index2 = timeouts.indexOf(this.timeoutID2);
    timeouts.splice(index, 1);
    timeouts.splice(index2, 1);
    clearTimeout(this.timeoutID);
    clearTimeout(this.timeoutID2);
    this.game.remove(this);
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
          this.radius, this.radius);
    }
    ctx.restore();
  };

})();
