'use strict';

var _ = require('lodash');
var Map = require('./map.model');

// Get list of maps
exports.index = function(req, res) {
  Map.find(function (err, maps) {
    if(err) { return handleError(res, err); }
    return res.json(200, maps);
  });
};

// Get a single map
exports.show = function(req, res) {
  Map.findById(req.params.id, function (err, map) {
    if(err) { return handleError(res, err); }
    if(!map) { return res.send(404); }
    return res.json(map);
  });
};

// Creates a new map in the DB.
exports.create = function(req, res) {
  Map.create(req.body, function(err, map) {
    if(err) { return handleError(res, err); }
    return res.json(201, map);
  });
};

// Updates an existing map in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Map.findById(req.params.id, function (err, map) {
    if (err) { return handleError(res, err); }
    if(!map) { return res.send(404); }
    var updated = _.merge(map, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, map);
    });
  });
};

// Deletes a map from the DB.
exports.destroy = function(req, res) {
  Map.findById(req.params.id, function (err, map) {
    if(err) { return handleError(res, err); }
    if(!map) { return res.send(404); }
    map.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}