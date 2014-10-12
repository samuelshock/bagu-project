(function() {
  var Category, actionFactory, responseHandler;

  actionFactory = require('../action-factory');

  Category = actionFactory.getActionInstance('category');

  responseHandler = require('../response-handler');

  exports.index = function(req, res) {
    return Category.getAll({}).then((function(_this) {
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
    return Category.findById(req.params.id).then((function(_this) {
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
    return Category.create(req.body).then((function(_this) {
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
    return Category.update(req.body).then((function(_this) {
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
    return Category["delete"](req.params.id).then((function(_this) {
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

//# sourceMappingURL=category-controller.js.map
