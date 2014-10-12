
# Get list of maps

# Get a single Publication

# Creates a new Publication in the DB.

# Updates an existing Publication in the DB.

# Deletes a Publication from the DB.
actionFactory = require '../action-factory'
Publication = actionFactory.getActionInstance 'publication'
responseHandler = require '../response-handler'

exports.index = (req, res) ->
  Publication.getAllPublication(true)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.show = (req, res) ->
  Publication.getPublicationById(req.params.id)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.create = (req, res) ->
  Publication.createPublication(req.body)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.update = (req, res) ->
  req.body._id = req.params.id unless req.body._id
  Publication.updatePublication(req.body)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.destroy = (req, res) ->
  filter =
    _id: req.params.id
  Publication.deletePublication(filter)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err




#exports.destroy = (req, res) ->
#  Publication.findById req.params.id, (err, map) ->
#    return handleError(res, err)  if err
#    return res.send(404)  unless map
#    map.remove (err) ->
#      return handleError(res, err)  if err
#      res.send 204
