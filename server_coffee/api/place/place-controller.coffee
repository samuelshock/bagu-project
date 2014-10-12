
# Get list of places

# Get a single Place

# Creates a new Place in the DB.

# Updates an existing Place in the DB.

# Deletes a Place from the DB.
actionFactory = require '../action-factory'
Place = actionFactory.getActionInstance 'place'
responseHandler = require '../response-handler'

exports.index = (req, res) ->
  Place.getAll({})
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.show = (req, res) ->
  Place.findById(req.params.id)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.create = (req, res) ->
  Place.create(req.body)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.update = (req, res) ->
  req.body._id = req.params.id unless req.body._id
  Place.update(req.body)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.destroy = (req, res) ->
  Place.delete(req.params.id)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err

