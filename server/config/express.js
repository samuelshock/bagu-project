
/*
Express configuration
 */

(function() {
  var bodyParser, compression, config, cookieParser, errorHandler, express, favicon, methodOverride, mongoStore, mongoose, morgan, passport, path, session;

  express = require("express");

  favicon = require("static-favicon");

  morgan = require("morgan");

  compression = require("compression");

  bodyParser = require("body-parser");

  methodOverride = require("method-override");

  cookieParser = require("cookie-parser");

  errorHandler = require("errorhandler");

  path = require("path");

  config = require("./environment/index");

  passport = require("passport");

  session = require("express-session");

  mongoStore = require("connect-mongo")(session);

  mongoose = require("mongoose");

  module.exports = function(app) {
    var env;
    env = app.get("env");
    app.set("views", config.root + "/server/views");
    app.set("view engine", "jade");
    app.use(compression());
    app.use(bodyParser.urlencoded({
      extended: false
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(session({
      secret: config.secrets.session,
      resave: true,
      saveUninitialized: true,
      store: new mongoStore({
        mongoose_connection: mongoose.connection
      })
    }));
    if ("production" === env) {
      app.use(favicon(path.join(config.root, "public", "favicon.ico")));
      app.use(express["static"](path.join(config.root, "public")));
      app.set("appPath", config.root + "/public");
      app.use(morgan("dev"));
    }
    if ("development" === env || "test" === env) {
      app.use(require("connect-livereload")());
      app.use(express["static"](path.join(config.root, ".tmp")));
      app.use(express["static"](path.join(config.root, "client")));
      app.set("appPath", "client");
      app.use(morgan("dev"));
      return app.use(errorHandler());
    }
  };

}).call(this);

//# sourceMappingURL=express.js.map
