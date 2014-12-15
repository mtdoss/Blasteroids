(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var GameView = window.Asteroids.GameView = function(game, ctx){
    this.game = game;
    this.game.gameView = this;
    this.ctx = ctx;
    this.$loadScreen = $("#load-screen");
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
  
  GameView.prototype.bindStart = function() {
    this.$loadScreen.show();
    var that = this;
    this.$loadScreen.find("button").click(function () {
      console.log("hello");
      that.$loadScreen.hide();
      that.start(that.bindStart.bind(that));
      $(this).off("click");
    });
  };

  GameView.prototype.start = function(callback) {
    var game = this.game;
    var that = this;

    var interval = window.setInterval((function(){
      if (game.lost()) {
        console.log("LOSE");
        game.lives = 3;
        clearInterval(interval);
        callback();
      }
      that.bindKeyHandlers();
      game.step();
      game.draw(this.ctx);
    }).bind(this), 20);
  };
})();