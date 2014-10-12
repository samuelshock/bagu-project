(function() {
  var Arrangement, actionFactory, responseHandler;

  actionFactory = require('../action-factory');

  Arrangement = actionFactory.getActionInstance('arrangement');

  responseHandler = require('../response-handler');

  exports.index = function(req, res) {
    return Arrangement.getAll({}).then((function(_this) {
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
    return Arrangement.findById(req.params.id).then((function(_this) {
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
    return Arrangement.create(req.body).then((function(_this) {
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
    return Arrangement.update(req.body).then((function(_this) {
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
    return Arrangement["delete"](req.params.id).then((function(_this) {
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

//# sourceMappingURL=arrangement-controller.js.map
