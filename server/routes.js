
/*
Main application routes
 */

(function() {
  var conf, errors;

  errors = require("./components/errors");

  conf = require('./config/config.json');

  module.exports = function(app) {
    app.use('/api/arrangements', require('./api/arrangement'));
    app.use('/api/places', require('./api/place'));
    app.use("/api/maps", require("./api/map"));
    app.use("/api/publications", require("./api/publication"));
    app.use("/api/categories", require("./api/category"));
    app.use("/api/users", require("./api/user"));
    app.use("/auth", require("./auth"));
    app.use("/api/configuration", require("./api/configuration"));
    app.route("/:url(api|auth|components|app|bower_components|assets)/*").get(errors[404]);
    return app.route("/*").get(function(req, res) {
      return res.sendfile(app.get("appPath") + "/index.html");
    });
  };

}).call(this);

//# sourceMappingURL=routes.js.map
