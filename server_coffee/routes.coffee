###
Main application routes
###
errors = require("./components/errors")

conf = require './config/config.json'
module.exports = (app) ->

  # Insert routes below
  app.use '/api/arrangements', require('./api/arrangement')
  app.use '/api/places', require('./api/place')
  app.use "/api/maps", require("./api/map")
  app.use "/api/publications", require("./api/publication")
  app.use "/api/categories", require("./api/category")
  app.use "/api/users", require("./api/user")
  app.use "/auth", require("./auth")
  app.use "/api/configuration", require("./api/configuration")

  # All undefined asset or api routes should return a 404
  app.route("/:url(api|auth|components|app|bower_components|assets)/*").get errors[404]

  # All other routes should redirect to the index.html
  app.route("/*").get (req, res) ->
    res.sendfile app.get("appPath") + "/index.html"
