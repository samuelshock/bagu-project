(function() {
  var configuration, express, router;

  express = require('express');

  configuration = require('../../config/config.json');

  router = express.Router();

  router.get('/', function(req, res) {
    return res.json(configuration);
  });

  module.exports = router;

}).call(this);

//# sourceMappingURL=index.js.map
