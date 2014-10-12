(function() {
  var BaseManager, MapManager, MapModel;

  MapModel = require("./map-model");

  BaseManager = require('../base-manager');

  MapManager = (function() {
    function MapManager() {
      this.mapManager = new BaseManager(MapModel);
    }


    /*
    Obtains all maps for filter option
    @param filter [Json] options to find
     */

    MapManager.prototype.getAll = function(filter) {
      if (filter == null) {
        filter = {};
      }
      return this.mapManager.find(filter);
    };

    MapManager.prototype.findById = function(id) {
      return this.mapManager.findById(id);
    };

    MapManager.prototype.create = function(map) {
      return this.mapManager.create(map);
    };

    MapManager.prototype.update = function(newData) {
      return this.mapManager.update(newData);
    };

    MapManager.prototype["delete"] = function(id) {
      var option;
      option = {
        _id: id
      };
      return this.mapManager.remove(option);
    };

    return MapManager;

  })();

  module.exports = MapManager;

}).call(this);

//# sourceMappingURL=map-manager.js.map
