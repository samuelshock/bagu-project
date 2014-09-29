

# Get list of places

# Get a single place

# Creates a new place in the DB.

# Updates an existing place in the DB.

# Deletes a place from the DB.
handleError = (res, err) ->
  res.send 500, err

_ = require("lodash")
Place = require("./place.model")
exports.index = (req, res) ->
  Place.find (err, places) ->
    return handleError(res, err)  if err
    res.json 200, places


exports.show = (req, res) ->
  Place.findById req.params.id, (err, place) ->
    return handleError(res, err)  if err
    return res.send(404)  unless place
    res.json place


exports.create = (req, res) ->
  Place.create req.body, (err, place) ->
    return handleError(res, err)  if err
    res.json 201, place


exports.update = (req, res) ->
  delete req.body._id  if req.body._id
  Place.findById req.params.id, (err, place) ->
    return handleError(res, err)  if err
    return res.send(404)  unless place
    updated = _.merge(place, req.body)
    updated.save (err) ->
      return handleError(res, err)  if err
      res.json 200, place



exports.destroy = (req, res) ->
  Place.findById req.params.id, (err, place) ->
    return handleError(res, err)  if err
    return res.send(404)  unless place
    place.remove (err) ->
      return handleError(res, err)  if err
      res.send 204

