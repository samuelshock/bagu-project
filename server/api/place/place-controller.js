(function() {
  var Place, actionFactory, responseHandler;

  actionFactory = require('../action-factory');

  Place = actionFactory.getActionInstance('place');

  responseHandler = require('../response-handler');

  exports.index = function(req, res) {
    return Place.getAll({}).then((function(_this) {
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
    return Place.findById(req.params.id).then((function(_this) {
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
    return Place.create(req.body).then((function(_this) {
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
    return Place.update(req.body).then((function(_this) {
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
    return Place["delete"](req.params.id).then((function(_this) {
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

//# sourceMappingURL=place-controller.js.map
