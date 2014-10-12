
# Get list of Arrangements

# Get a single Arrangement

# Creates a new Arrangement in the DB.

# Updates an existing Arrangement in the DB.

# Deletes a Arrangement from the DB.
actionFactory = require '../action-factory'
Arrangement = actionFactory.getActionInstance 'arrangement'
responseHandler = require '../response-handler'

exports.index = (req, res) ->
  Arrangement.getAll({})
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.show = (req, res) ->
  Arrangement.findById(req.params.id)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.create = (req, res) ->
  Arrangement.create(req.body)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.update = (req, res) ->
  req.body._id = req.params.id unless req.body._id
  Arrangement.update(req.body)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.destroy = (req, res) ->
  Arrangement.delete(req.params.id)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err

