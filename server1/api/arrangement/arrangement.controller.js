'use strict';

var _ = require('lodash');
var Arrangement = require('./arrangement.model');

// Get list of arrangements
exports.index = function(req, res) {
  Arrangement.find(function (err, arrangements) {
    if(err) { return handleError(res, err); }
    return res.json(200, arrangements);
  });
};

// Get a single arrangement
exports.show = function(req, res) {
  Arrangement.findById(req.params.id, function (err, arrangement) {
    if(err) { return handleError(res, err); }
    if(!arrangement) { return res.send(404); }
    return res.json(arrangement);
  });
};

// Creates a new arrangement in the DB.
exports.create = function(req, res) {
  Arrangement.create(req.body, function(err, arrangement) {
    if(err) { return handleError(res, err); }
    return res.json(201, arrangement);
  });
};

// Updates an existing arrangement in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Arrangement.findById(req.params.id, function (err, arrangement) {
    if (err) { return handleError(res, err); }
    if(!arrangement) { return res.send(404); }
    var updated = _.merge(arrangement, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, arrangement);
    });
  });
};

// Deletes a arrangement from the DB.
exports.destroy = function(req, res) {
  Arrangement.findById(req.params.id, function (err, arrangement) {
    if(err) { return handleError(res, err); }
    if(!arrangement) { return res.send(404); }
    arrangement.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}