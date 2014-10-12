(function() {
  exports.handleError = function(res, err) {
    if (err.statusCode) {
      res.send(err.statusCode, err);
    }
    return res.send(500, err);
  };

  exports.handleSuccess = function(res, result) {
    if (result.statusCode) {
      res.json(result.statusCode, result);
    }
    return res.json(200, result);
  };

}).call(this);

//# sourceMappingURL=response-handler.js.map
