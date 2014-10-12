(function() {
  var BaseManager, PlaceManager, PlaceModel;

  PlaceModel = require('./place-model');

  BaseManager = require('../base-manager');

  PlaceManager = (function() {
    function PlaceManager() {
      this.placeManager = new BaseManager(PlaceModel);
    }

    PlaceManager.prototype.getAll = function(filter) {
      if (filter == null) {
        filter = {};
      }
      return this.placeManager.find(filter);
    };

    PlaceManager.prototype.findById = function(id) {
      return this.placeManager.findById(id);
    };

    PlaceManager.prototype.create = function(map) {
      return this.placeManager.create(map);
    };

    PlaceManager.prototype.update = function(newData) {
      return this.placeManager.update(newData);
    };

    PlaceManager.prototype["delete"] = function(id) {
      var option;
      option = {
        _id: id
      };
      return this.placeManager.remove(option);
    };

    return PlaceManager;

  })();

  module.exports = PlaceManager;

}).call(this);

//# sourceMappingURL=place-manager.js.map
