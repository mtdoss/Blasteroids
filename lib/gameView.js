(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  GameView = Asteroids.GameView = function(game, ctx){
    this.game = game;
    this.ctx = ctx;
  };
//TODO: Refactor
  GameView.prototype.bindKeyHandlers = function() {
    var ship = this.game.ships[0];
    // key('w', function() { ship.power([0, -0.3]); });
    // key('a', function() { ship.turnLeft(); });
    // key('s', function() { ship.slow([0, 0.3]); });
    // key('d', function() { ship.turnRight(); });
    // key('space', function() { ship.fireBullet(); });
    var keys = key.getPressedKeyCodes();
    if (keys.indexOf(37) != -1) {
      ship.turnLeft();
    }
    if (keys.indexOf(38) != -1) {
      ship.power();
    }
    if (keys.indexOf(39) != -1) {
      ship.turnRight();
    }
    if (keys.indexOf(40) != -1) {
      ship.slow();
    }
    if (keys.indexOf(32) != -1) {
      ship.fireBullet();
    }
  };

  GameView.prototype.start = function() {
    var game = this.game;
    // this.bindKeyHandlers();
    var that = this;
    window.setInterval((function(){
      that.bindKeyHandlers();
      game.step();
      game.draw(this.ctx);
    }).bind(this), 20);
  };
})();