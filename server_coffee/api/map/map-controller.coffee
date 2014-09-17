
# Get list of maps

# Get a single map

# Creates a new map in the DB.

# Updates an existing map in the DB.

# Deletes a map from the DB.
handleError = (res, err) ->
  res.send 500, err
"use strict"
_ = require("lodash")
Map = require("./map.model")
exports.index = (req, res) ->
  Map.find (err, maps) ->
    return handleError(res, err)  if err
    res.json 200, maps


exports.show = (req, res) ->
  Map.findById req.params.id, (err, map) ->
    return handleError(res, err)  if err
    return res.send(404)  unless map
    res.json map


exports.create = (req, res) ->
  Map.create req.body, (err, map) ->
    return handleError(res, err)  if err
    res.json 201, map


exports.update = (req, res) ->
  delete req.body._id  if req.body._id
  Map.findById req.params.id, (err, map) ->
    return handleError(res, err)  if err
    return res.send(404)  unless map
    updated = _.merge(map, req.body)
    updated.save (err) ->
      return handleError(res, err)  if err
      res.json 200, map



exports.destroy = (req, res) ->
  Map.findById req.params.id, (err, map) ->
    return handleError(res, err)  if err
    return res.send(404)  unless map
    map.remove (err) ->
      return handleError(res, err)  if err
      res.send 204

