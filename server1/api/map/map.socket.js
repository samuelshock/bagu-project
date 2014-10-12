/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Map = require('./map.model');

exports.register = function(socket) {
  Map.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Map.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('map:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('map:remove', doc);
}