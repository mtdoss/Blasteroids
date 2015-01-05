(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var GameView = window.Asteroids.GameView = function(game, ctx){
    this.game = game;
    this.game.gameView = this;
    this.ctx = ctx;
    this.$loadScreen = $("#load-screen");
    this.firstGame = true;
  };
//TODO: Refactor
  GameView.prototype.bindKeyHandlers = function() {
    var ship = this.game.ships[0];
    var keys = key.getPressedKeyCodes();
    if (keys.indexOf(37) != -1 || key.isPressed("A")) {
      ship.turnLeft();
    }
    if (keys.indexOf(38) != -1 || key.isPressed("W")) {
      ship.power();
    }
    if (keys.indexOf(39) != -1 || key.isPressed("D")) {
      ship.turnRight();
    }
    if (keys.indexOf(40) != -1 || key.isPressed("S")) {
      ship.slow();
    }
    if (keys.indexOf(32) != -1) {
      ship.fireBullet();
    }
    if (key.isPressed("E")) {
      ship.invincibleBonus();
    }
  };
  
  GameView.prototype.bindStart = function() {
    this.$loadScreen.show();
    // if (this.firstGame === false) {
    //   this.$loadScreen.find("text").html("You lose, play again?");
    // }
    var that = this;
    this.game = new Asteroids.Game();
    this.$loadScreen.find("button").click(function () {
      console.log("hello");
      that.$loadScreen.hide();
      that.start(that.bindStart.bind(that));
      $(this).off("click");
    });
    this.firstGame = false;
  };

  GameView.prototype.start = function(callback) {
    var game = this.game;
    var that = this;

    var interval = window.setInterval((function(){
      if (game.lost()) {
        console.log("LOSE");
        game.lives = 3;
        clearInterval(interval);
        // callback();
        that.bindStart();
      }
      that.bindKeyHandlers();
      game.step();
      game.draw(this.ctx);
    }).bind(this), 20);
  };
})();
