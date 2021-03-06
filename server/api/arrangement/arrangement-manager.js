(function() {
  var ArrangementManager, ArrangementModel, BaseManager;

  ArrangementModel = require("./arrangement-model");

  BaseManager = require('../base-manager');

  ArrangementManager = (function() {
    function ArrangementManager() {
      this.arrangementManager = new BaseManager(ArrangementModel);
    }


    /*
    Obtains all maps for filter option
    @param filter [Json] options to find
     */

    ArrangementManager.prototype.getAll = function(filter) {
      if (filter == null) {
        filter = {};
      }
      return this.arrangementManager.find(filter);
    };

    ArrangementManager.prototype.findById = function(id) {
      return this.arrangementManager.findById(id);
    };

    ArrangementManager.prototype.create = function(arrangement) {
      var total_price;
      total_price = arrangement.price * arrangement.days;
      if (isNaN(total_price)) {
        total_price = 0;
      }
      arrangement.total_price = total_price;
      return this.arrangementManager.create(arrangement);
    };

    ArrangementManager.prototype.update = function(newData) {
      return this.arrangementManager.update(newData);
    };

    ArrangementManager.prototype["delete"] = function(id) {
      var option;
      option = {
        _id: id
      };
      return this.arrangementManager.remove(option);
    };

    return ArrangementManager;

  })();

  module.exports = ArrangementManager;

}).call(this);

//# sourceMappingURL=arrangement-manager.js.map
