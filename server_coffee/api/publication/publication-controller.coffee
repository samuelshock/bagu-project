
# Get list of publications

# Get a single publication

# Creates a new publication in the DB.

# Updates an existing publication in the DB.

# Deletes a publication from the DB.
handleError = (res, err) ->
  res.send err.statusCode, err if err.statusCode
  res.send 500, err

_ = require("lodash")
Publication = require("./publication-manager")
publicationManager = Publication.getInstance()
Handler = require '../response-handler'

exports.index = (req, res) ->
  Publication.getAllPublication(true)
  .then (publications) =>
    Handler.handleSuccess res, publications
  .fail (err) ->
    Handler.handleError(res, err)


exports.show = (req, res) ->
  Publication.findById req.params.id, (err, publication) ->
    return handleError(res, err)  if err
    return res.send(404)  unless publication
    res.json publication


exports.create = (req, res) ->
  Publication.create req.body, (err, publication) =>
    return handleError(res, err)  if err
    User.findById publication.owner, (err, user) ->
      return handleError(res, err)  if err
      user.publications.push publication._id
      user.save (error) ->
        return handleError(res, error)  if error
        res.json 201, publication


exports.update = (req, res) ->
  delete req.body._id  if req.body._id
  Publication.findById req.params.id, (err, publication) ->
    return handleError(res, err)  if err
    return res.send(404)  unless publication
    updated = _.merge(publication, req.body)
    updated.save (err) ->
      return handleError(res, err)  if err
      res.json 200, publication



exports.destroy = (req, res) ->
  Publication.findById req.params.id, (err, publication) ->
    return handleError(res, err)  if err
    return res.send(404)  unless publication
    publication.remove (err) ->
      return handleError(res, err)  if err
      res.send 204

