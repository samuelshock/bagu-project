(function() {
  var Publication, actionFactory, responseHandler;

  actionFactory = require('../action-factory');

  Publication = actionFactory.getActionInstance('publication');

  responseHandler = require('../response-handler');

  exports.index = function(req, res) {
    return Publication.getAllPublication(true).then((function(_this) {
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
    return Publication.getPublicationById(req.params.id).then((function(_this) {
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
    return Publication.createPublication(req.body).then((function(_this) {
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
    return Publication.updatePublication(req.body).then((function(_this) {
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
    var filter;
    filter = {
      _id: req.params.id
    };
    return Publication.deletePublication(filter).then((function(_this) {
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

//# sourceMappingURL=publication-controller.js.map
