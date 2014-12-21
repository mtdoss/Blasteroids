(function() {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }
  
  var Game = Asteroids.Game = function(){
    
    this.DIM_X = 800;
    this.DIM_Y = 600;
    this.NUM_ASTEROIDS = 20;
    this.NUM_BONUSES = 1;
    this.asteroids = [];
    this.bonuses = [];
    this.addAsteroids();
//    this.addBonuses();
    this.ships = [];
    this.buildShip();
    this.bullets = [];
    this.lifeImg = new Image();
    this.lifeImg.src = "./lib/life.png";
    this.level = 1;
    this.points = 0;
    this.lives = 3;
    this.gameView;
  };
  
  Game.prototype.addAsteroids = function(){
    for (var i = 0; i < this.NUM_ASTEROIDS; i++){
      this.asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
    }
  };

  Game.prototype.addBonuses = function(){
    for (var i = 0; i < this.NUM_BONUSES; i++){
      this.bonuses.push(new Asteroids.Bonus(this.randomPosition(), this));
    }
  };


  Game.prototype.add = function(obj) {
    if (obj instanceof Asteroids.Asteroid){
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    } else if (obj instanceof Asteroids.Bonus) {
      this.bonuses.push(obj);
    }
  };

  Game.prototype.remove = function(obj) {
    var index;
    if (obj instanceof Asteroids.Asteroid) {
      index = this.asteroids.indexOf(obj);
      this.asteroids.splice(index, 1);
    } else if (obj instanceof Asteroids.Bullet) {
      index = this.bullets.indexOf(obj);
      this.bullets.splice(index, 1);
    } else if (obj instanceof Asteroids.Bonus) {
      index = this.bonuses.indexOf(obj);
      this.bonuses.splice(index, 1);
    }
  };

  Game.prototype.lost = function() {
    return this.lives === 0;
  };
  
  Game.prototype.randomPosition = function(){
    var posx = Math.floor(Math.random() * this.DIM_X);
    var posy = Math.floor(Math.random() * this.DIM_Y);
    return [posx, posy];
  };
  
  Game.prototype.draw = function(ctx){
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.drawImage(img, 0, 0, 800, 600);
    this.allObjects().forEach(function(object){
      object.draw(ctx);
    });
    this.drawLives(ctx);
    this.drawPoints(ctx);
  };

  Game.prototype.drawLives = function(ctx) {
    var lives = this.lives;
    for (var i = 0; i < lives; i++) {
      ctx.drawImage(this.lifeImg, i * 20, 0, 20, 20);
    }
  };

  Game.prototype.drawPoints = function(ctx) {
    ctx.fillStyle = "orange";
    ctx.font = "20pt Arial";
    var points = this.points;
    if (points < 10) {
      ctx.fillText(points, 780, 30);
    } else if (points < 100) {
      ctx.fillText(points, 760, 30);
    } else if (points < 1000) {
      ctx.fillText(points, 740, 30);
    } else if (points < 10000) {
      ctx.fillText(points, 720, 30);
    } else {
      ctx.fillText(points, 700, 30);
    }
    ctx.fill();
  };
  
  Game.prototype.moveObjects = function(){
    this.allObjects().forEach(function(object){
      object.move();
    });
  };

  Game.prototype.nextLevel = function() {
    if (this.asteroids.length === 0) {
      alert('You completed level ' + this.level + '!');
      this.level += 1;
      this.addAsteroids();
    }
  };

  Game.prototype.isOutOfBounds = function(pos) {
    var x = pos[0];
    var y = pos[1];
    if (x <= 0 || y <= 0 || x >= this.DIM_X || y >= this.DIM_Y) {
      return true;
    }

    return false;
  };
  
  Game.prototype.wrap = function(pos) {
    var x = pos[0];
    var y = pos[1];
    if (x <= 0) {
      x = x + this.DIM_X;
    } else if (x >= this.DIM_X) {
      x = 0;
    }
    if (y <= 0) {
      y = y + this.DIM_Y;
    } else if (y >= this.DIM_Y) {
      y = 0;
    }
    return [x, y];
  };
  
  Game.prototype.checkCollisions = function(){
    // for (var i = 0; i < this.asteroids.length; i++){
    //   for (var j = i + 1; j < this.asteroids.length; j++){
    //     if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])){
    //       this.allObjects().splice(i, 1);
    //       this.allObjects().splice(j - 1, 1);
    //     }
    //   }
    // }
    for (var i = 0; i < this.bullets.length; i ++) {
      this.bullets[i].collideWith();
    }
    this.ships[0].collideWith();
  };
  
  Game.prototype.step = function(){
    this.moveObjects();
    this.checkCollisions();
    this.nextLevel();
  };
  
  Game.prototype.allObjects = function(){
    return [].concat(this.asteroids).concat(this.ships).concat(this.bullets).concat(this.bonuses);
  };

  Game.prototype.buildShip = function(){
    var pos = [];
    pos[0] = this.DIM_X / 2;
    pos[1] = this.DIM_Y / 2;
    // pos = this.randomPosition();
    var ship = new Asteroids.Ship(pos, this);

    this.ships.push(ship);
  };

})();






















