
# Get list of maps

# Get a single Map

# Creates a new Map in the DB.

# Updates an existing Map in the DB.

# Deletes a Map from the DB.
actionFactory = require '../action-factory'
Map = actionFactory.getActionInstance 'map'
responseHandler = require '../response-handler'

exports.index = (req, res) ->
  Map.getAll({})
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.show = (req, res) ->
  Map.findById(req.params.id)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.create = (req, res) ->
  Map.create(req.body)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.update = (req, res) ->
  req.body._id = req.params.id unless req.body._id
  Map.update(req.body)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.destroy = (req, res) ->
  Map.delete(req.params.id)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err




#exports.destroy = (req, res) ->
#  Map.findById req.params.id, (err, map) ->
#    return handleError(res, err)  if err
#    return res.send(404)  unless map
#    map.remove (err) ->
#      return handleError(res, err)  if err
#      res.send 204

