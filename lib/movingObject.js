(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color, game){
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.game = game;
  };

  MovingObject.prototype.draw = function(ctx){
    var xCoord = this.pos[0];
    var yCoord = this.pos[1];
  
    ctx.fillStyle = this.color;
    ctx.beginPath();
  
    ctx.arc(
      xCoord,
      yCoord,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
  
    ctx.fill();
  };

  MovingObject.prototype.isWrappable = true;

//TODO: fix some stuff here
  MovingObject.prototype.move = function() {
    if (this.game.isOutOfBounds(this.pos)){
      if (this.isWrappable) {
        var pos = this.game.wrap(this.pos);
      } else {
        this.game.remove(this);
      }
    }
    var pos = this.game.wrap(this.pos);
    var vel = this.vel;
    var xPos = pos[0] + vel[0];
    var yPos = pos[1] + vel[1];
    this.pos = [xPos, yPos];
  };
  
  MovingObject.prototype.isCollidedWith = function(otherObject){
    sumOfRadii = parseInt(this.radius) + parseInt(otherObject.radius);
    var x1 = this.pos[0];
    var x2 = otherObject.pos[0];
    var y1 = this.pos[1];
    var y2 = otherObject.pos[1];
    
    
    dist = Math.sqrt( (Math.pow((x1 - x2), 2)) + (Math.pow((y1 - y2), 2)) );
    
    if (dist > sumOfRadii){
      return false;
    } else {
      return true;
    }
  };

})();

//Dist([x_1, y_1], [x_2, y_2]) = sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2)
