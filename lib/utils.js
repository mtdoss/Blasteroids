(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  Util.inherits = function (subclass, superclass) {
    var Surrogate = function() {};
    Surrogate.prototype = superclass.prototype;
    subclass.prototype = new Surrogate();
  };
  
  Util.randomVec = function(length){
    var dx = Math.floor(Math.random() * length);
    var dy = Math.floor(Math.random() * length);
    return [dx, dy];
  };

  Util.unitVec = function(angle) {
    return [ Math.sin(angle), -1 * Math.cos(angle) ];
  };

  Util.addVectors = function(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1]];
  };
    //
  // Asteroids.Util.prototype.inherits.call(Asteroids.Asteroid, Asteroids.MovingObject);
  // Asteroid.inherits(MovingObject);
})();