'use strict';

var _ = require('lodash');
var Place = require('./place.model');

// Get list of places
exports.index = function(req, res) {
  Place.find(function (err, places) {
    if(err) { return handleError(res, err); }
    return res.json(200, places);
  });
};

// Get a single place
exports.show = function(req, res) {
  Place.findById(req.params.id, function (err, place) {
    if(err) { return handleError(res, err); }
    if(!place) { return res.send(404); }
    return res.json(place);
  });
};

// Creates a new place in the DB.
exports.create = function(req, res) {
  Place.create(req.body, function(err, place) {
    if(err) { return handleError(res, err); }
    return res.json(201, place);
  });
};

// Updates an existing place in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Place.findById(req.params.id, function (err, place) {
    if (err) { return handleError(res, err); }
    if(!place) { return res.send(404); }
    var updated = _.merge(place, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, place);
    });
  });
};

// Deletes a place from the DB.
exports.destroy = function(req, res) {
  Place.findById(req.params.id, function (err, place) {
    if(err) { return handleError(res, err); }
    if(!place) { return res.send(404); }
    place.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}