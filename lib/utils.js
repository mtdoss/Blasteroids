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
    var dx = 1 + Math.floor(Math.random() * length);
    var dy = 1 + Math.floor(Math.random() * length);
    return [dx, dy];
  };

  Util.unitVec = function(angle) {
    return [ Math.sin(angle), -1 * Math.cos(angle) ];
  };

  Util.addVectors = function(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1]];
  };

  Util.distance = function(p1, p2) {
    var x1 = p1[0];
    var x2 = p2[0];
    var y1 = p1[1];
    var y2 = p2[1];

    return Math.sqrt(Math.pow(x2-x1, 2), Math.pow(y2-y1, 2));
  }
    //
  // Asteroids.Util.prototype.inherits.call(Asteroids.Asteroid, Asteroids.MovingObject);
  // Asteroid.inherits(MovingObject);
})();
