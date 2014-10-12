(function() {
  var Map, actionFactory, responseHandler;

  actionFactory = require('../action-factory');

  Map = actionFactory.getActionInstance('map');

  responseHandler = require('../response-handler');

  exports.index = function(req, res) {
    return Map.getAll({}).then((function(_this) {
      return function(result) {
        return responseHandler.handleSuccess(res, result);
      };
    })(this)).fail((function(_this) {
      return function(err) {
        return responseHandler.handleError(res, err);
      };
    })(this));
  };

  exports.show = function(req, res) {
    return Map.findById(req.params.id).then((function(_this) {
      return function(result) {
        return responseHandler.handleSuccess(res, result);
      };
    })(this)).fail((function(_this) {
      return function(err) {
        return responseHandler.handleError(res, err);
      };
    })(this));
  };

  exports.create = function(req, res) {
    return Map.create(req.body).then((function(_this) {
      return function(result) {
        return responseHandler.handleSuccess(res, result);
      };
    })(this)).fail((function(_this) {
      return function(err) {
        return responseHandler.handleError(res, err);
      };
    })(this));
  };

  exports.update = function(req, res) {
    if (!req.body._id) {
      req.body._id = req.params.id;
    }
    return Map.update(req.body).then((function(_this) {
      return function(result) {
        return responseHandler.handleSuccess(res, result);
      };
    })(this)).fail((function(_this) {
      return function(err) {
        return responseHandler.handleError(res, err);
      };
    })(this));
  };

  exports.destroy = function(req, res) {
    return Map["delete"](req.params.id).then((function(_this) {
      return function(result) {
        return responseHandler.handleSuccess(res, result);
      };
    })(this)).fail((function(_this) {
      return function(err) {
        return responseHandler.handleError(res, err);
      };
    })(this));
  };

}).call(this);

//# sourceMappingURL=map-controller.js.map
