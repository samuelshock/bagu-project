
# Get list of categories

# Get a single Category

# Creates a new Category in the DB.

# Updates an existing Category in the DB.

# Deletes a Category from the DB.
actionFactory = require '../action-factory'
Category = actionFactory.getActionInstance 'category'
responseHandler = require '../response-handler'

exports.index = (req, res) ->
  Category.getAll({})
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.show = (req, res) ->
  Category.findById(req.params.id)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.create = (req, res) ->
  Category.create(req.body)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.update = (req, res) ->
  req.body._id = req.params.id unless req.body._id
  Category.update(req.body)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err


exports.destroy = (req, res) ->
  Category.delete(req.params.id)
  .then (result) =>
    responseHandler.handleSuccess res, result
  .fail (err) =>
    responseHandler.handleError res, err

