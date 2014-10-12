
/*
Main application routes
 */

(function() {
  var errors;

  errors = require("./components/errors/index");

  module.exports = function(app) {
    app.use('/api/arrangements', require('./api/arrangement/index'));
    app.use('/api/places', require('./api/place/index'));
    app.use("/api/maps", require("./api/map/index"));
    app.use("/api/publications", require("./api/publication/index"));
    app.use("/api/categories", require("./api/category/index"));
    app.use("/api/users", require("./api/user/index"));
    app.use("/auth", require("./auth/index"));
    app.route("/:url(api|auth|components|app|bower_components|assets)/*").get(errors[404]);
    return app.route("/*").get(function(req, res) {
      return res.sendfile(app.get("appPath") + "/index.html");
    });
  };

}).call(this);

//# sourceMappingURL=routes.js.map
