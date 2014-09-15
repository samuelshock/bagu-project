'use strict';

var _ = require('lodash');
var Publication = require('./publication.model');

// Get list of publications
exports.index = function(req, res) {
  Publication.find(function (err, publications) {
    if(err) { return handleError(res, err); }
    return res.json(200, publications);
  });
};

// Get a single publication
exports.show = function(req, res) {
  Publication.findById(req.params.id, function (err, publication) {
    if(err) { return handleError(res, err); }
    if(!publication) { return res.send(404); }
    return res.json(publication);
  });
};

// Creates a new publication in the DB.
exports.create = function(req, res) {
  Publication.create(req.body, function(err, publication) {
    if(err) { return handleError(res, err); }

    return res.json(201, publication);
  });
};

// Updates an existing publication in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Publication.findById(req.params.id, function (err, publication) {
    if (err) { return handleError(res, err); }
    if(!publication) { return res.send(404); }
    var updated = _.merge(publication, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, publication);
    });
  });
};

// Deletes a publication from the DB.
exports.destroy = function(req, res) {
  Publication.findById(req.params.id, function (err, publication) {
    if(err) { return handleError(res, err); }
    if(!publication) { return res.send(404); }
    publication.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}