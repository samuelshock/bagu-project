(function() {
  var controller, express, router;

  express = require('express');

  controller = require('./publication-controller');

  router = express.Router();

  router.get('/', controller.index);

  router.get('/:id', controller.show);

  router.post('/', controller.create);

  router.put('/:id', controller.update);

  router.put('/:id/comments', controller.updateStarsComments);

  router.patch('/:id', controller.update);

  router["delete"]('/:id', controller.destroy);

  module.exports = router;

}).call(this);

//# sourceMappingURL=index.js.map
